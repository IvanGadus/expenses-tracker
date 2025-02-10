import { prisma } from "@/lib/db";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(reqest: Request) {
	const body = await reqest.text();

	//premenna ktora obsahuje data zo stripe requestu
	let event;

	//verifikacia ze request prichadza od stripe
	//v env pridat stripe webhook secret z webhooku stripe
	try {
		event = stripe.webhooks.constructEvent(
			body,
			reqest.headers.get("Stripe-Signature")!,
			process.env.STRIPE_WEBHOOK_SECRET!
		);
	} catch (e) {
		if (e instanceof Error) {
			console.error("⚠️  Webhook signature verification failed.", e);
		}
		return Response.json({ received: false }, { status: 400 });
	}

	switch (event.type) {
		case "checkout.session.completed":
			await prisma.membership.create({
				data: {
					userId: event.data.object.client_reference_id!,
					status: "active",
				},
			});
			break;
		default:
			console.log("Unhandled event type: " + event.type);
	}

	return Response.json(
		{
			received: true,
		},
		{ status: 200 }
	);
}
