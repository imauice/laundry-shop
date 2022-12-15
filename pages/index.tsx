import { InferGetServerSidePropsType } from 'next'
import { GetServerSideProps } from 'next'
import { Data } from '../model/machine'
import s from '../styles/fatchmachine.module.css'
import Image from 'next/image'
import machine from "../public/src/images/laundry-machine.png"
import Start from '../functions/start'
import styles from '../styles/Home.module.css'
import NavbarMain from '../component/nav'
import Banner from '../component/banner'
import MidleStrip from '../component/midlestrip'

export  const  getServerSideProps: GetServerSideProps<{ idlemachine: Data[],busymachine:Data[] }> = async () => {
  var requestOptions: RequestInit = {
    method: 'POST',
    headers: { "public_key": `${process.env.NEXT_PUBLIC_KEY}` },
    redirect: 'follow'
  };

 const idle = await  fetch(`http://localhost:3000/api/machinelist?status=idle`, requestOptions)
 const busy = await  fetch(`http://localhost:3000/api/machinelist?status=busy`, requestOptions)
  const idlemachine: Data[] = await idle.json()
  const busymachine: Data[] = await busy.json()
  return {
    props: {
      idlemachine,busymachine
    },
  }
}

function GetIdleMachine({ idlemachine,busymachine }: InferGetServerSidePropsType<typeof getServerSideProps>) {

  Start;

  return (

    <div className={styles.container}>
      <NavbarMain/>
      <main className={styles.main}>
        <Banner/>
        <MidleStrip/>

    <section>
    <h1 className='idle py-2'>Idle Machine</h1>
    <div className="row px-5 py-5">

      {idlemachine.map((item, index) => <div id={item.id} className="col-6 col-md-2 px-3 py-3" key={index}>

        <div className={s.img}>
          <Image
            alt="laundry shop logo"
            src={machine}
            width={193}
            height={265}
            style={{
              width: '100%',
              maxWidth: '350px',
              height: 'auto',
            }}
          />
        
            
            <div className={s.simulate}>
            <h5>Simulation</h5>
            <button className='btn btn-primary' onClick={()=>Start(item.id)}>
                Put coin to start Machine
            </button>
            </div>
        

        </div>
        <ul className={s.list}>
          <li>
            <strong>Name: </strong>{item.id}
          </li>
          <li>
            <strong>Location: </strong>{item.location}
          </li>
          <li>
            <strong>Price: </strong>{item.price} baht
          </li>
          <li>
            <strong>Status: </strong>{item.status}
          </li>
          <li>
            <strong>Cycle time: </strong>{Number(item.workingtime) / 60000} minute
          </li>
        </ul>

      </div>)
      }
    </div>
    {/* busy machine  */}
    <h1 className='busy py-2'>Busy Machine</h1>
    <div className="row px-5 py-5">
      
    {busymachine.map((item, index) => <div id={item.id} className="col-6 col-md-2 px-3 py-3" key={index}>
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
  </section>
  </main>
  <footer className={styles.footer}>

</footer>
  </div>
  )
  
}

export default GetIdleMachine