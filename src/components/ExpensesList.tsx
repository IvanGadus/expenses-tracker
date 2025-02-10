import React from "react";
import FormButton from "./FormButton";

type ExpensesProps = {
	expenses: {
		id: number;
		description: string;
		amount: number;
		createdAt: Date;
	}[];
};

export default async function ExpensesList({ expenses }: ExpensesProps) {
	return (
		<ul className="h-[300px] min-h-max bg-white rounded mt-4 shadow-md">
			{expenses.map((expense) => (
				<li className="flex items-center px-4 py-2 border-b" key={expense.id}>
					<p>{expense.description}</p>
					<p className="ml-auto font-bold mr-[15px]">${expense.amount}</p>
					<FormButton id={expense.id} />
				</li>
			))}
		</ul>
	);
}
