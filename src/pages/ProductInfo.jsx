import React, { useEffect } from 'react'
import PriceContainer from './PriceContainer'
import AddToCart from './AddToCart'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProduct } from '../Redux/FetchProduct.js'

const ProductInfo = ({product}) => {
  const { products } = useSelector((state) => ({
    products: state.hive.products || [],
  }));
      const dispatch=useDispatch();
  useEffect(()=>{
    dispatch(fetchProduct())
  },[dispatch])

 console.log("the product is th ",products);


  return (
   <div className='flex flex-col justify-between gap-10 normal-case'>
     <div className='flex justify-center flex-col gap-8'>
        <h1 className='text-2xl font-semibold'>{product.name}</h1>
        <PriceContainer item={product} priceStyle="text-xl font-bold "  />
        <p className='text-sm font-semibold  text-gray-400'>{product.description}</p>
        <p className='text-sm font-semibold'>Be the first to Leave Review</p>
        <div>
            <p className='text-base font-semibold'><span className='text-slate-600 font-normal mr-1'>Category </span>:  {product.category}</p>
        </div>
        <AddToCart  item={product} AddToCartStyle={"py-3 text-lg font-bold tracking-wide"}/>

        
    </div>



    <div>
    <hr className='border border-neutral-400 ' />

    <div className='py-5 hidden sm:block'>
      <div>
        <h1 className='font-semibold text-neutral-500'>More related Product's</h1>
      </div>
      <div className=' '>
       
       <ul className='flex gap-2 w-full'>
          {
          products?.length > 0 && (
            products?.filter(product=>product.category === "Women").slice(0,2).map((product) => (
              <li className='flex flex-col' key={product._id}>
                <div>
                  <img src={product.imageUrl[0]} alt="" />
                </div>

                <div>
                <h1 className='text-2xl font-semibold'>{product.name}</h1>
                <PriceContainer item={product} priceStyle=""  />
                </div>
              </li>
            ))
          )
          
          }
        </ul>
       
      </div>
    </div>

    </div>
   </div>
  )
}

export default ProductInfo