import { db } from '@/lib/db';
import { getSelf } from './auth-service';


export const getRecommended = async () => {
    // await new Promise(resolve => setTimeout(resolve, 3000));
    let userId;
    try {
        const self = await getSelf();
        userId = self.id
    }
    catch {
        userId = null;
    }

    let users = [];

    //demonstrate all users but the user that is logged in.
    if (userId) {
        users = await db.user.findMany({
            where: {
                AND: [
                    {
                        NOT: {
                            id: userId
                        },
                    },
                    {
                        NOT: {
                            followedBy: {
                                some: {
                                    followerId: userId
                                }
                            }
                        }
                    },
                    {
                        NOT: {
                            blocking: {
                                some: {
                                    blockedId: userId
                                }
                            }
                        }
                    }
                ]
            },
            orderBy: {
                createdAt: 'desc'
            }
        })
    }
    //it shows all users even though no user is logged in
    else {
        users = await db.user.findMany({
            orderBy: {
                createdAt: 'asc',
            }
        })
    }

    return users;

}