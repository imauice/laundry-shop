import s from '../styles/ads.module.css'

export default function Ads(){
    return(
        <div className={s.ads} >
            <div className={s.adscontent}>

           
            <h4 className={s.h4} >Start Today</h4>
            <h2 className={s.h2}>
                Save And More Comford
            </h2>
            <button className='btn btn-primary text-light'>Sign Up</button>
            <button className='btn '>show More</button>
            </div>
        </div>
    )
}