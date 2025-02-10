import PurchaseBTN from "@/components/PurchaseBTN";
import { prisma } from "@/lib/db";
import {
	getKindeServerSession,
	LoginLink,
	RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs/server";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
	const { isAuthenticated, getUser } = getKindeServerSession();
	const isAuthenticatedUser = await isAuthenticated();
	let isPayinggMember = false;

	const user = await getUser();

	if (user) {
		const memberShip = await prisma.membership.findFirst({
			where: {
				userId: user.id,
				status: "active",
			},
		});

		if (memberShip) {
			isPayinggMember = true;
		}
	}

	return (
		<div className="bg-[#5dc9a8] min-h-screen flex flex-col xl:flex-row items-center justify-center gap-10">
			<Image
				src="https://bytegrad.com/course-assets/youtube/expensestracker/preview.png"
				alt="expenses tracker"
				width={700}
				height={472}
				className="rounded-md"
			/>
			<div>
				<h1 className="text-5xl font-semibold my-6 max-w-[500px]">
					Track your <span className="font-extrabold">expenses</span> with ease
				</h1>
				<p className="text-2xl font-medium max-w-[600px]">
					Use Expenses tracker to easily keep track of your ezpenses. Get
					ligetime acces for 5$
				</p>
				<div className="mt-10 space-x-3">
					{!isAuthenticatedUser ? (
						<>
							<LoginLink className="bg-black text-white py-2 px-4 rounded-lg font-medium">
								Login
							</LoginLink>
							<RegisterLink className="bg-black/70 text-white py-2 px-4 rounded-lg font-medium">
								Register
							</RegisterLink>
						</>
					) : isPayinggMember ? (
						<Link
							className="bg-black text-white py-2 px-4 rounded-lg font-medium"
							href={"/app/dashboard"}
						>
							Go to dashboard
						</Link>
					) : (
						<PurchaseBTN />
					)}
				</div>
			</div>
		</div>
	);
}
