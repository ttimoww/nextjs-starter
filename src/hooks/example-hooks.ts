import { doSomething, doSomethingWithError, getUser } from "@/actions/example-actions"
import { QUERY_KEYS } from "@/lib/constants"
import { useMutation, useQuery } from "@tanstack/react-query"

export const useGetUserQuery = () => {
    return useQuery({
        queryKey: [QUERY_KEYS.user],
        queryFn: getUser,
        initialData: { data: null, success: true }
    })
}

export const useDotSomethingMutation = () => {
    return useMutation({
        mutationFn: doSomething
    })
}

export const useDoSomethingWithErrorMutation = () => {
    return useMutation({
        mutationFn: doSomethingWithError
    })
}