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
        setTimeout(() => {

            var requestOptions:RequestInit = {
                method: 'POST',
                headers: {"secret_key": `${process.env.NEXT_PUBLIC_SECRET_KEY}`},
                redirect: 'follow'
            };

            const message = `${machine_id} service will finish in 1 minute`
            console.log(message)

            fetch(`https://laundry-shop-nine.vercel.app/api/linemessage?message=${message}`, requestOptions)
                .then(response => {
                    if(response.statusText=="OK"){
                        console.log("message ",message," sending to line group")
                    }
                })
                .catch(error => console.log('error', error));

        }, ((machine[0].workingtime) - (60 * 1000)));

        //machine stop process
        setTimeout(() => {

            var requestOptions: RequestInit = {
                method: 'POST',
                headers: { "secret_key": `${process.env.NEXT_SECRET_KEY}` },
                redirect: 'follow'
            };
            const url = `https://laundry-shop-nine.vercel.app/api/machinestop?machine_id=${machine_id}`

            fetch(url, requestOptions).then((res) => {

                if (res.statusText == 'OK') {
                    console.log(`${machine_id} is finish operation`)
                }
            })

        }, ((machine[0].workingtime)));

        response.status(200).json(result);
    }
}
