
export default function Stop(id:string|undefined){


    const machine_id = id;
 var requestOptions: RequestInit = {
   method: 'POST',
   headers: { "secret_key": `${process.env.NEXT_SECRET_KEY}` },
   redirect: 'follow'
 };
 console.log(requestOptions)
 const url = `/api/machinestop?machine_id=${machine_id}`
 console.log(url)
 fetch(url, requestOptions).then((res)=>{
   
   console.log(res)
   
 })


   
}
