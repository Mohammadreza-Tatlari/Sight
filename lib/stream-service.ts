import { db } from "./db";

export async function getStreamByUserId(userId :string){
    const stream = await db.stream.findUnique({
        where:{
            userId: userId
        }
    })

    return stream;
}