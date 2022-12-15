import { connectToDatabase } from "../../lib/mongodb";
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(request:NextApiRequest, response:NextApiResponse ) {

  const worktime = Number(request.query.worktime)*60*1000 ;
  const  createtime = new Date().toLocaleString('en-US', { timeZone: 'Asia/Jakarta' });

   const data = {
    id:request.query.machine_id,
    location:request.query.machine_location,
    price:request.query.price,
    workingtime:worktime,
    status:"idle",
    create_time_stamp: createtime
   }

    const { database }:any = await connectToDatabase();
    const collection = database.collection(process.env.NEXT_ATLAS_COLLECTION);
    const checkExist = await collection.find({id:request.query.machine_id}).toArray();
 
  
    if(request.method != 'POST' 
    || checkExist.length>0
    || request.headers.secret_key != process.env.NEXT_PUBLIC_SECRET_KEY
      ) {
      response.end("Welcome to my laundry api. This is private api. Thank you");
      return
    }
   
    else{
   
     const result = await collection.insertOne(data);
    response.status(200).json(result); 
    
    }
    
}