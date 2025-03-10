'use server'

import { actionClient } from '@/actions/safe-action';

import { BaseError } from '@/lib/exceptions';

export const getUser = actionClient.action(async () => {
    if (Math.random() > 0.5) {
        return null;
    }

    return { name: 'John Doe' };
})

export const doSomething = actionClient.action(async () => {
    return { foo: 'bar' };
});

export const doSomethingWithError = actionClient.action(async () => {
    throw new BaseError({ name: 'ExampleError', message: 'This is an example error' });
});
