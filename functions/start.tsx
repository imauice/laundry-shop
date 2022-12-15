export default async function Start(id:string|undefined){


       const machine_id = id;
    var requestOptions: RequestInit = {
      method: 'POST',
      headers: {"secret_key": "qLv0UkbT2g1lJthL5jgGzVneLSWqMS3x"},
      redirect: 'follow'
    };
   
    const url = `https://laundry-shop-nine.vercel.app/api/machinestart?machine_id=${machine_id}`;

  await fetch(url, requestOptions).then((res)=>{
      if(res.statusText == 'OK'){
          console.log(`${machine_id} is started`);
          location.reload();
      }
    }).catch(error => console.log('error', error));     
  }
  