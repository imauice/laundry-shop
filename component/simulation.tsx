import React, { useState, useEffect } from 'react';
import s from '../styles/fatchmachine.module.css'

export default function Simulation() {
    const [count, setCount] = useState(0);

    function Count() {
        if (count < 40){setCount(count + 10)}
        else if(count==40){

           setCount(0)
        }       

    }

    return (
        <div >
            <h5>Simulation</h5>
            <button className='btn btn-primary' onClick={Count}>
                Put coin to start Machine
            </button>
            <div id="coin">{count}</div>
        </div>
    );
}

