import { db } from "./db";
import { getSelf } from "./auth-service";
import { error } from "console";

export async function isBlockedByUser(id: string) {

    try {

        const self = await getSelf()

        const otherUser = await db.user.findUnique({
            where: {
                id: id //id
            }
        })

        if (!otherUser) {
            throw new Error("User not Found")
        }

        if (otherUser.id === self.id) {
            return false;
        }

        //check if user is blocked
        // const existingBlock = await db.block.findFirst({
        //     where: {
        //         blockerId: otherUser.id,
        //         blockedId: self.id
        //     }
        // })

        //findunique use the index that we have created in modal thus it will be faster
        const existingBlock = await db.block.findUnique({
            where: {
                blockedId_blockerId: {
                    blockerId: otherUser.id,
                    blockedId: self.id
                }
            }
        })

        return !!existingBlock;

    } catch (error) {
        return false;
    }
}


// for blocking user
export async function blockUser(id: string) {
    const self = await getSelf()
    const otherUser = await db.user.findUnique({
        where: {
            id
        }
    })

    if (self.id === id) {
        throw new Error("cannot block yourself")
    }

    if (!otherUser) {
        throw new Error("User not Found")
    }

    const existingBlocked = await db.block.findUnique({
        where: {
            blockedId_blockerId: {
                blockedId: otherUser.id,
                blockerId: self.id
            }
        }
    })

    if (existingBlocked) {
        throw new Error("Already Blocked")
    }

    const block = await db.block.create({
        data: {
            blockerId: self.id,
            blockedId: otherUser.id
        },
        include: {
            blocked: true
        }
    })

    return block;
};


export async function unblockUser(id: string) {
    const self = await getSelf()
    if (self.id === id) {
        throw new Error("Self cannot be Unblocked")
    }

    const otherUser = await db.user.findUnique({
        where: {
            id
        }
    })

    if (!otherUser) {
        throw new Error("User not Found");
    }

    const existingBlock = await db.block.findUnique({
        where: {
            blockedId_blockerId: {
                blockerId: self.id,
                blockedId: otherUser.id
            },
        }
    })

    if (!existingBlock) {
        throw new Error("User is not blocked");
    }

    const unblock = await db.block.delete({
        where: {
            id: existingBlock.id
        },
        include: {
            blocked: true
        }
    })

    return unblock;
}

export async function getBlockedUsers () {
    const self = await getSelf();

    const blockedList = await db.block.findMany({
        where: {
            blockerId: self.id
        },
        include:{
            blocked: true
        }
    })

    return blockedList;
}

