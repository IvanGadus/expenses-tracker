import { addExpense } from "@/actions/actions";
import React from "react";

export default function ExpensesForm() {
	return (
		<form className="w-full mt-8 rounded overflow-hidden" action={addExpense}>
			<input
				className="w-full px-3 py-2 outline-none"
				type="text"
				placeholder="Description"
				name="description"
			/>
			<input
				className="w-full px-3 py-2 outline-none"
				type="number"
				placeholder="Amount"
				name="amount"
			/>
			<button className="w-full bg-blue-500 text-white px-2 py-2 font-bold">
				Add expense
			</button>
		</form>
	);
}
