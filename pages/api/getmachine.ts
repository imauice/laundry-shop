import { connectToDatabase } from "../../lib/mongodb";
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(request:NextApiRequest, response:NextApiResponse ) {
    
    const { database }:any = await connectToDatabase();
    const collection = database.collection(process.env.NEXT_ATLAS_COLLECTION);

    if (request.method != "POST" || request.headers.public_key != process.env.PUBLIC_KEY) {
        response.end("welcome to my laundry api. This is private api. Thank you")
    }
    else {
    const results = await collection.find({id:request.query.machine_id}).toArray();

    response.status(200).json(results);
    }

}