
export default function Start(id:string|undefined){


       const machine_id = id;
    var requestOptions: RequestInit = {
      method: 'POST',
      headers: { "secret_key": `qLv0UkbT2g1lJthL5jgGzVneLSWqMS3x` },
      redirect: 'follow'
    };
    const url = `/api/machinestart?machine_id=${machine_id}`
    fetch(url, requestOptions).then((res)=>{
      if(res.statusText == 'OK'){
          console.log(`${machine_id} is started`)
          window.location.reload()
      }
      
      
    })
   
  
      
  }
  