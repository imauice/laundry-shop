import { connectToDatabase } from "../../lib/mongodb";

export default async function handler(request, response) {

  const worktime = Number(request.query.worktime)*60*1000 ;

   const data = {
    id:request.query.machine_id,
    location:request.query.machine_location,
    price:request.query.price,
    workingtime:worktime,
    status:"idle",
    create_time_stamp:(new Date()),
   }

    const { database } = await connectToDatabase();
    const collection = database.collection(process.env.NEXT_ATLAS_COLLECTION);
    const checkExist = await collection.find({id:request.query.machine_id}).toArray();
 
  
    if(request.method != 'POST' 
    || checkExist.length>0
    || request.headers.secret_key != process.env.SECRET_KEY
      ) {
      response.end();
    }
   
    else{
   
     const result = await collection.insertOne(data);
    response.status(200).json(result); 
    
    }
    
  
    


}