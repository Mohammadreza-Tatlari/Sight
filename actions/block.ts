'use server'

import { getSelf } from "@/lib/auth-service";
import { blockUser, unblockUser } from "@/lib/block-service";
import { RoomServiceClient } from "livekit-server-sdk";
import { revalidatePath } from 'next/cache';

const roomService = new RoomServiceClient(
    process.env.LIVEKIT_API_URL!,
    process.env.LIVEKIT_API_KEY!,
    process.env.LIVEKIT_API_SECRET!,
);

export async function onBlock(id: string) {

    const self = await getSelf()

    let blockedUser

    try {
        blockedUser = await blockUser(id);
    }
    catch {
        //in this case the user is a guest

    }

    try{
        //the room that users are using is the identified as the user id
        //and the second argument is the id of the guest in roomService
        await roomService.removeParticipant(self.id, id)
    } 
    catch{
        //this means that user is not in room
    }

    revalidatePath(`/u/${self.username}/community`)

    // if (blockedUser) {
    //     revalidatePath(`/${blockedUser.blocked.username}`)
    // }

    return blockedUser;
}

export async function onUnblock(id: string) {
    const unblockedUser = await unblockUser(id);
    const user = await getSelf()

    revalidatePath(`/u/${user.username}/community`)

    // if (unblockedUser) {
    //     revalidatePath(`/${unblockedUser.blocked.username}`)
    // }

    return unblockedUser;
}