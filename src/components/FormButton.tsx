"use client";
import { deleteExpense } from "@/actions/actions";
import React from "react";

export default function FormButton({ id }: { id: number }) {
	return (
		<button
			onClick={() => deleteExpense(id)}
			className="text-[10px] h-[20px] w-[20px] bg-red-500 text-white rounded hover:bg-red-600"
		>
			X
		</button>
	);
}
