'use client';

import { Button } from "@/components/ui/button";
import { useDoSomethingWithErrorMutation, useDotSomethingMutation, useGetUserQuery } from "@/hooks/example-hooks";
import { actionErrorToast } from "@/lib/utils";
import { useEffect } from "react";
import { toast } from "sonner";

export default function Home() {
	const { mutate: doSomething, isPending: doSomethingPending } = useDotSomethingMutation();
	const { mutate: doSomethingWithError, isPending: doSomethingWithErrorPending, data } = useDoSomethingWithErrorMutation();
	const { data: userData } = useGetUserQuery()

	useEffect(() => {
		if (!data) return;

		if (!data.success) {
			actionErrorToast(data.error);
			return
		}

		toast.success('Action completed successfully');

	}, [data])

	return (
		<main className="flex justify-center items-center gap-5 h-screen">
			<Button onClick={doSomething} disabled={doSomethingPending}>Do Something</Button>
			<Button  onClick={doSomethingWithError} variant="destructive" disabled={doSomethingWithErrorPending}>Do Something With Error</Button>
			<code>
				{JSON.stringify(userData)}
			</code>
		</main>
	);
}
