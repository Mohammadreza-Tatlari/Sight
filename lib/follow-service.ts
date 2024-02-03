import { db } from "./db";
import { getSelf } from "./auth-service";

export async function isFollowingUser(id: string) {
    try {
        const self = await getSelf();
        const otherUser = await db.user.findUnique({
            where: { id }
        })

        if (!otherUser) {
            throw new Error("User not Found");
        }
        //user always follow herself
        if (otherUser.id == self.id) {
            return true;
        }
 
        const existingFollow = await db.follow.findFirst({
            where: {
                followerId: self.id,
                followingId: otherUser.id
            }
        })

        return !!existingFollow;
    }
    catch {
        return false;
    }
}

//action to follow user
export async function followUser(id: string) {
    const self = await getSelf();

    const otherUser = await db.user.findUnique({
        where: {id},
    });

    if(!otherUser) {
        throw new Error("User not Found")
    }

    if(otherUser.id === self.id){
        throw new Error("self cannot be followed")
    }

    const existingFollow = await db.follow.findFirst({
        where: {
            followerId: self.id,
            followingId: otherUser.id
        },
    });

    if(existingFollow) {
        throw new Error("Already following")
    }

    const follow = await db.follow.create({
        data: {
            followerId: self.id,
            followingId: otherUser.id
        },
        include: {
            following: true,
            follower: true
        }
    });

    return follow;
} 

