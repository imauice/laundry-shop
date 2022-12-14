import { useState, useEffect } from "react";
import Image from "next/image";
import { Data } from "../model/machine";
import s from '../styles/fatchmachine.module.css'
import machine from '../public/src/images/laundry-machine.png'
// import machineStyle from '../styles/fatchmachine.module.css' 

export default function GetBusyMachine() {
  const [data, setData] = useState<Data[]>();
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true)

    var requestOptions: RequestInit = {
      method: 'POST',
      headers: { "public_key": `${process.env.NEXT_PUBLIC_KEY}` },
      redirect: 'follow'
    };

    fetch(`/api/machinelist?status=busy`, requestOptions)
      .then((res) =>res.json())
      .then((data:Data[]) => {
        setData(data)
        setLoading(false)
        
      })
  }, [])

  if (isLoading) return <p>loading ...</p>
  if (!data) return <p>No data</p>
 
  return (
   
    <div className="row px-5 py-5">
      
      {data.map((item, index) => <div id={item.id} className="col-6 col-md-2 px-3 py-3" key={index}>
      <Image
        alt="laundry shop logo"
        src={machine}
        width={193}
        height={265} 
        style={{
          width:'100%',
          maxWidth: '350px',           
          height: 'auto',
        }}
      />
        <ul className={s.list}>
          <li>
           <strong>Name: </strong>{item.id}
          </li>
          <li>
            <strong>Location: </strong>{item.location}
          </li>
          <li>
            <strong>Price: </strong>{item.price}
          </li>
          <li>
            <strong>Status: </strong>{item.status}
          </li>
          <li>
            <strong>Finish At: </strong>{item.stoptime}
          </li>
        </ul>
        
        </div>)
        }


    </div>
    )
}

