'use server'
import { followUser } from "@/lib/follow-service";
import { revalidatePath } from 'next/cache';

export async function onFollow(id: string) {
    try {
        const followedUser = await followUser(id);

        revalidatePath('/');

        if (followedUser) {
            revalidatePath(`/${followedUser.following.username}`);
        }
        return followedUser;
    } catch (error) {
        throw new Error("Internal Error")
    }
}