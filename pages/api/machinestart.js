import { connectToDatabase } from "../../lib/mongodb";


export default async function handler(request, response) {

    const { database } = await connectToDatabase();
    const collection = database.collection(process.env.NEXT_ATLAS_COLLECTION);
    const machine = await collection.find({ id: request.query.machine_id }).toArray();
    

    if (machine.length != 1 
        || request.method != "POST" 
        || request.headers.secret_key != process.env.SECRET_KEY 
        || machine[0].status !="idle") {
        
        if(machine[0].status=="busy"){
            response.end("machine busy");
        }
        else{

            console.log("error: machine error");
            response.end();
        }
    }

    else {
        const starttime = (new Date());
        const result = await collection.updateOne({ id: request.query.machine_id }, {
            $set: {
                status: "busy",
                starttime: starttime,
                stoptime:""
            },
            $currentDate: { lastModified: true }
        });
        
        setTimeout(() => {

            //machine stop process
            console.log("machine: ",request.query.machine_id," stopped");
            var requestOptions = {
                method: 'POST',
                headers: { "secret_key": `${process.env.SECRET_KEY}` },
                redirect: 'follow'
              };
          
              fetch(`/api/machinestop?machine_id=${request.query.machine_id}`, requestOptions)

        }, ((machine[0].workingtime)-60000));

        response.status(200).json(result);
    }
}
