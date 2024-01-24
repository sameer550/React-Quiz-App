'use client'
import React from 'react'
import image from "../components/img/Expertizo-logo.png"
function Homepage() {
  return (
    <div className='h-screen w-50'>
      heeh    
       <img className=" max-w-full" src={image} alt="image description"/>
       <div className="flex justify-center">
              <button
                className="w-[190px] py-2 my-2 ps-2 pe-2 text-xs border border-solid border-black text-center rounded-md"
                onClick={() => {
                  
                }}
              >
                start Quiz
              </button>
            </div>
    </div>
    
  )
}

export default Homepage