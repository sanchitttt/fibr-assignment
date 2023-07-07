import React from 'react'
import { ClipLoader } from 'react-spinners';

function Loader() {
    return (
        <div className='absolute left-[50%] top-[50%]' style={{ transform: 'translate(-50%,-50%)' }}>
            <ClipLoader color="#36d7b7" />
        </div>
    )
}

export default Loader