

export default async function Start(id:string|undefined){

 
 const key = process.env.NEXT_PUBLIC_START_KEY
       const machine_id = id
    var requestOptions: RequestInit = {
      method: 'POST',
      headers: { "secret_key": `${key}`},
      redirect: 'follow'
    };
   
    const url = `https://laundry-shop-nine.vercel.app/api/machinestart?machine_id=${machine_id}`;

    var retry= 5;
    var delay = 1000;

    const Retry= async ()=>{
      await fetch(url, requestOptions).then((res)=>{
      if(res.statusText == 'OK'){
    
          console.log(`${machine_id} is started`);
      }
    }).catch(error => {
      console.log('error', error);

      if(retry>0){
        return new Promise(resolve=>
          setTimeout(resolve,delay)
          )
          .then(()=>{
            Retry();
            retry--;
            delay*2;

          })
      }
    
    });
    }

    try {
      Retry();
    } catch (error) {
      console.log(error);
      
    }
        

  }

 





  
 