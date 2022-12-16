import { connectToDatabase } from "../../lib/mongodb";
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(request: NextApiRequest, response: NextApiResponse) {

    const { database }: any = await connectToDatabase();
    const collection = database.collection(process.env.NEXT_ATLAS_COLLECTION);
    const machine = await collection.find({ id: request.query.machine_id }).toArray();


    if (machine.length != 1
        || request.method != "POST"
        || request.headers.secret_key != process.env.NEXT_PUBLIC_SECRET_KEY
        || machine[0].status != "idle") {

        if (machine[0].status == "busy") {
            response.end("machine busy");
        }
        else {

            console.log("error: machine error");
            response.end();
        }
    }

    else {

        const starttime = new Date()
        var stoptime = (new Date(starttime));

        stoptime.setMinutes(starttime.getMinutes() + (parseInt(machine[0].workingtime) / (60 * 1000)))

        const result = await collection.updateOne({ id: request.query.machine_id }, {
            $set: {
                status: "busy",
                starttime: starttime.toLocaleString('en-US', { timeZone: 'Asia/Jakarta' }),
                stoptime: stoptime.toLocaleString('en-US', { timeZone: 'Asia/Jakarta' }),
            },
            $currentDate: { lastModified: true }
        });

        
        
        const machine_id = request.query.machine_id;

        //send line message
  
        var requestOptions:RequestInit = {
            method: 'POST',
            redirect: 'follow'
          };

          const message =`machine ${machine_id} will finish service on ${stoptime}`
          const timer = parseInt(machine[0].workingtime)-60000;
          
          fetch(`https://line-api2.onrender.com/linemessage?message=${message}&timer=${timer}`, requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));

        //machine stop process
        const cycletime = parseInt(machine[0].workingtime);
        fetch(`https://line-api2.onrender.com/laundrymachine/stop?machine=${machine_id}&timer=${cycletime}`, requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));

        response.status(200).json(result);
    }
}
