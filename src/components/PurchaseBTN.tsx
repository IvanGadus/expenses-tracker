"use client";
import { createCheckoutSession } from "@/actions/actions";
import React from "react";

export default function PurchaseBTN() {
	return (
		<button
			onClick={async () => await createCheckoutSession()}
			className="bg-black text-white py-2 px-4 rounded-lg font-medium"
		>
			$ Pay $
		</button>
	);
}
