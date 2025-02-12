"use server";

import { prisma } from "@/lib/db";
import { chceckAutenticationAndMembership } from "@/lib/server-utils";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import Stripe from "stripe";

export async function addExpense(formData: FormData) {
	//autentication
	const user = await chceckAutenticationAndMembership();

	await prisma.expenses.create({
		data: {
			creatorId: user.id,
			description: formData.get("description") as string,
			amount: Number(formData.get("amount")),
		},
	});
	revalidatePath("/app/dashboard");
}

export async function deleteExpense(id: number) {
	console.time("Prisma Query Time");
	await chceckAutenticationAndMembership();
	await prisma.expenses.delete({
		where: {
			id: id,
		},
	});
	console.timeEnd("Prisma Query Time");
	console.time("revalidate Start");
	revalidatePath("/app/dashboard");
	console.timeEnd("Revalidate End");
}

export async function createCheckoutSession() {
	const { isAuthenticated, getUser } = getKindeServerSession();

	if (!(await isAuthenticated())) {
		redirect("/api/auth/login");
	}
	const user = await getUser();
	const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

	// Create Checkout Sessions from body params.
	const session = await stripe.checkout.sessions.create({
		customer_email: user.email!,
		client_reference_id: user.id,
		line_items: [
			{
				// Provide the exact Price ID (for example, pr_1234) of the product you want to sell
				price: "price_1QpUTJAy5pYVy18tW02X8lIx",
				quantity: 1,
			},
		],
		mode: "payment",
		success_url: `${process.env.BASE_URL}app/dashboard?payment=success`,
		cancel_url: `${process.env.BASE_URL}`,
	});
	redirect(session.url!);
}
