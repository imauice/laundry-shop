import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useState } from "react";
import { Data } from "../model/machine";
import  { useRouter } from 'next/router';

export default function About({data}: InferGetServerSidePropsType<typeof getServerSideProps>){

const [result,setResult] = useState({data});

const router = useRouter()

const  Start = async (id:string|undefined) =>{


    const key = process.env.NEXT_PUBLIC_START_KEY
    var requestOptions: RequestInit = {
        method: 'POST',
        headers: { "secret_key": `${key}`},
        redirect: 'follow'
      };
   await fetch(`http://localhost:3000/api/machinestart?machine_id=${id}`,requestOptions).then( async (res)=>{


   if(res.statusText=="OK"){
     var requestOptionsForupdate: RequestInit = {
    method: 'POST',
    headers: { public_key: `${ process.env.NEXT_PUBLIC_KEY}`},
    redirect: 'follow'
  };


   const update = await fetch(`http://localhost:3000/api/machinelist?status=idle`,requestOptionsForupdate)
   const updateResult = await update.json()
   setResult(updateResult);
 
       data = result.data
       console.log("result data: ",result.data)
   }
   });

  
   router.replace(router.asPath);
  
   console.log("data ",data);

}

return (
    <div>
      <h1>This is the test</h1>
      <p>For mor information please contact</p><a type="email">lxauicexl@gmail.com</a>
    </div>
)
}

export const getServerSideProps:GetServerSideProps<{data:Data[]}> = async () => {

    const public_key = process.env.NEXT_PUBLIC_KEY;
    const requestOptions:RequestInit = {
        method : "POST",
        headers: {"public_key":`${public_key}`},
        redirect: 'follow'

    }
    const url = `http://localhost:3000/api/machinelist?status=idle`
   
    const res = await fetch(url,requestOptions);
    const data:Data[] = await res.json();
    

    return {props:{
        data
    }}
}
