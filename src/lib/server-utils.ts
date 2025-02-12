import "server-only";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";

export async function chceckAutenticationAndMembership(waitTime = 0) {
	// authentication check
	const { isAuthenticated, getUser } = getKindeServerSession();
	if (!(await isAuthenticated())) {
		redirect("/api/auth/login");
	}

	// authorization check
	const user = await getUser();

	await new Promise((resolve) => setTimeout(resolve, waitTime));

	const membership = await prisma.membership.findFirst({
		where: {
			userId: user.id,
		},
	});

	if (!membership || membership.status !== "active") {
		return redirect("/");
	}

	return user;
}
