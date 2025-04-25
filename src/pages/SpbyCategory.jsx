import React from 'react'
import img1 from "../assets/gshirt1.png"
import img2 from "../assets/black2.png"
import img3 from "../assets/offpant3.png"
import img4 from "../assets/jeansp4.png"
import { NavLink } from 'react-router-dom'
import { FaArrowRightLong } from "react-icons/fa6";
import Container from '../components/Container'

const data=[
    {title:'SweatShirt', image:img1},
    {title:'T-shirt', image:img2},
    {title:'Official Pant', image:img3},
    {title:'Jeans Pant', image:img4},
    
]

const SpbyCategory = () => {
  return (
   <>
    <Container>
    <div>
        
    </div>
    </Container>
    <div className='grid grid-cols-2 sm:grid-cols-4 '>
        {data.map((item,index)=>{
            return(
                <div key={index} className=''>
                   <NavLink to="/shop" >
                    <div className='bg-'>
                    <img src={item.image} alt={item.title} className='w-full sm:hover:scale-110 transition ease-in-out duration-500 ' />
                    </div>
                   
                   </NavLink>
                   <button className='flex gap-2 pb-5 px-2'>
                   <p className='uppercase font-semibold '>{item.title}</p>
                   <FaArrowRightLong className='  pt-1'/>
                   </button>

                </div>
            )
        })}
    </div>
   </>
  )
}

export default SpbyCategory