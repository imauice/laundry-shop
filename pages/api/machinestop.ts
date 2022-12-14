import { connectToDatabase } from "../../lib/mongodb";
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(request:NextApiRequest, response:NextApiResponse) {

    const { database }:any = await connectToDatabase();
    const collection = database.collection(process.env.NEXT_ATLAS_COLLECTION);
    const machine = await collection.find({ id: request.query.machine_id }).toArray();

    if (machine.length != 1 
        || request.method != "POST" 
        || request.headers.secret_key != process.env.SECRET_KEY 
        || machine[0].status !="busy") {

            if(machine[0].status =="idle"){
                response.end("machine on idle status");
            }
            else{
                response.end("Error: machine error");
            }
        }

        else{
            const stoptime = (new Date());
        const result = await collection.updateOne({ id: request.query.machine_id }, {
            $set: {
                status: "idle",
                starttime: "",
                stoptime:stoptime
            },
            $currentDate: { lastModified: true }
        });

        response.status(200).json(result);
        
        }

}