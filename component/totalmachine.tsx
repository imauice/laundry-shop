import Image from 'next/image'
import londrymachine from "../public/src/images/laundry-machine.png"


export default function Totalmachine(){
    return(
       <section className='totalmachine w-100 mt-5' >
        <div className='row'>


            <div className="col avariable px-3">
                <div className='avariable-item'>Avariable</div>
                </div>
            <div className='col'>
                <Image
        alt="laundry shop machine"
        src={londrymachine}
        width={193}
        height={264} 
        style={{           
            maxHeight: '100px',
            width:'100%'
        }}
        />
            </div>
            
      <div className='col total'>x30</div>
        </div>
     
       </section>
    )
}