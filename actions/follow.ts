//using use server in order to make it works and also add to security to treat it
//as an API route and protect it from spilling into js bundle
"use server";
import { followUser, unfollowUser } from "@/lib/follow-service";
//using revalidatepath to update global states and memory cache
import { revalidatePath } from 'next/cache';

export const onFollow = async (id: string) => {
    try {
        const followedUser = await followUser(id);
        console.log(followedUser);

        revalidatePath('/');

        if (followedUser) {
            revalidatePath(`/${followedUser.following.username}`);
        }
        return followedUser;
    } catch (error) {
        throw new Error("Internal Error")

    }
}

export async function onUnfollow(id: string) {
    try {
        const unfollowedUser = await unfollowUser(id);

        revalidatePath('/');

        if (unfollowedUser) {
            revalidatePath(`/${unfollowedUser.following.username}`)
        }
        return unfollowedUser;
    }
    catch (error) {
        throw new Error("Internal Error");
    }
}