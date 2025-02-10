import { prisma } from "@/lib/db";
import ExpensesForm from "@/components/ExpensesForm";
import ExpensesList from "@/components/ExpensesList";
import React from "react";
import { chceckAutenticationAndMembership } from "@/lib/server-utils";
import { revalidatePath } from "next/cache";

type SearchParamsType = Promise<{
	[key: string]: string | string[] | undefined;
}>;
export default async function Page({
	searchParams,
}: {
	searchParams: SearchParamsType;
}) {
	const paymentValueFromUrl = (await searchParams).payment;
	const user = await chceckAutenticationAndMembership(
		paymentValueFromUrl === "success" ? 5000 : 0
	);
	if (paymentValueFromUrl === "success") {
		return revalidatePath("/app/dashboard");
	}

	const expenses = await prisma.expenses.findMany({
		where: {
			creatorId: user.id,
		},
	});
	return (
		<div>
			<h1 className="text-3xl font-bold text-white text-center">Dashboard</h1>
			<div className="w-full max-w-[600px] mx-auto">
				<ExpensesList expenses={expenses} />
				<ExpensesForm />
			</div>
		</div>
	);
}
