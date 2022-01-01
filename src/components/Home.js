import React from 'react'
import app from "../App";
const  Home = () => {
    return (
        <>
            <div> 
            Home
            <button onClick={()=>app.auth().signOut()}></button>
            </div>
        </>

    )
}

export default Home;
