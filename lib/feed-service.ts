import { db } from "./db";
import { getSelf } from "./auth-service";

export async function getStream() {
    let userId;

    try {
        const self = await getSelf();
        userId = self.id;
    } catch {
        userId = null
    }

    let streams = [];

    if (userId) {
        streams = await db.stream.findMany({
            where: {
                user: {
                    NOT: {
                        blocked: {
                            some: {
                                blockedId: userId,
                            }
                        }
                    }
                }
            },
            select: {
                id: true,
                user: true,
                isLive: true,
                name: true,
                thumbnailUrl: true
            },
            // include: {
            //     user: true
            // },
            orderBy: [
                {
                    isLive: 'desc',
                },
                { updatedAt: 'desc' }
            ]
        })


    } else {
        streams = await db.stream.findMany({
            // include: {
            //     user: true
            // },
            select: {
                id: true,
                user: true,
                isLive: true,
                name: true,
                thumbnailUrl: true
            },
            orderBy: [
                {
                    isLive: 'desc',
                },
                { updatedAt: 'desc' }
            ]
        })
    }
    return streams;
}