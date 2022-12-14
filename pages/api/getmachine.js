import { connectToDatabase } from "../../lib/mongodb";

export default async function handler(request, response) {
    
    const { database } = await connectToDatabase();
    const collection = database.collection(process.env.NEXT_ATLAS_COLLECTION);

    if (request.method != "POST" || request.headers.public_key != process.env.PUBLIC_KEY) {
        response.end("welcome to my laundry api. This is private api. Thank you")
    }
    else {
    const results = await collection.find({id:request.query.machine_id}).toArray();

    response.status(200).json(results);
    }

}