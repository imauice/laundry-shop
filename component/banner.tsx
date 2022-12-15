import Ads from "./advertist"
import Image from "next/image"
import laundrybanner from '../public/src/images/laundry-banner.png'
export default function Banner(){
    return (
        <div className='row px-3 py-3 mt-4'>
          <div className='col-12 col-lg-5'>
            <Ads />
          </div>
          <div className='col-12 col-lg-7'>
            <div className='banner'>

              <Image
                alt="laundry shop banner"
                src={laundrybanner}
                width={750}
                height={379}
                style={{
                  width: '90%',
                  height: 'auto',
                }}
              />
            </div>
          </div>
        </div>
    )
}