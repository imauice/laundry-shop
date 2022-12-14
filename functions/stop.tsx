
export default function Stop(id:string|undefined){


    const machine_id = id;
 var requestOptions: RequestInit = {
   method: 'POST',
   headers: { "secret_key": `qLv0UkbT2g1lJthL5jgGzVneLSWqMS3x` },
   redirect: 'follow'
 };
 console.log(requestOptions)
 const url = `/api/machinestop?machine_id=${machine_id}`
 console.log(url)
 fetch(url, requestOptions).then((res)=>{
   
   console.log(res)
   
 })


   
}
