import { connectToDatabase } from "../../lib/mongodb";

export default async function handler(request, response) {

    const { database } = await connectToDatabase();
    const collection = database.collection(process.env.NEXT_ATLAS_COLLECTION);

    if (request.method != "POST" || request.headers.public_key != process.env.PUBLIC_KEY) {
        response.end("welcome to my laundry api. This is private api. Thank you")
    }
    else {
        const reqStatus = request.query.status;
        if (reqStatus == "idle" || reqStatus == "busy") {
            const results = await collection.find({ status: reqStatus }).toArray();
            if (results == '') { console.log(`No ${reqStatus} machine`) }
            response.status(200).json(results);
        }
        else {
            console.log("Request error: System sending idle machine for automaticaly");
            const results = await collection.find({ status: "idle" }).toArray();

            response.status(200).json(results);
        }

    }


}