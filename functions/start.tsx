export default function Start(id:string|undefined){

console.log(process.env.NEXT_PUBLIC_START_KEY)
       const machine_id = id;
    var requestOptions: RequestInit = {
      method: 'POST',
      headers: { "secret_key": `""`},
      redirect: 'follow'
    };
   
    const url = `/api/machinestart?machine_id=${machine_id}`;

   fetch(url, requestOptions).then((res)=>{
      if(res.statusText == 'OK'){
          console.log(`${machine_id} is started`);
          location.reload();
      }
    }).catch(error => console.log('error', error));     
  }
  