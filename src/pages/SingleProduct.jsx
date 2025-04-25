import React, { useState,useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ProductInfo from './ProductInfo';
import Container from '../components/Container';

const SingleProduct = () => {
  const [products, setProducts] = useState({});
  // Extract `id` from the route parameters
  const { id } = useParams();

  // Function to fetch single product data
  const fetchData = async (id) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/admin/singleProduct/${id}`);
      console.log("API Response: ", response);
      const data = response.data;
      if (data) {
        console.log("log",data);
        setProducts(data.product);
        
        
      } else {
        console.log("Product Fetching Error");
      }
    } catch (error) {
      console.log("Error From Single Product", error);
    }
  };
  console.log("lhgik",products);
  // Fetch data when component mounts
  useEffect(() => {
   
      if(id) fetchData(id);
    
  }, [id]);

  return (
    <Container className="container sm:grid sm:grid-cols-2 sm:py-10 px-5 flex flex-col justify-center  sm:gap-10">
      {/* <h1>Single Product</h1> */}
      <div className=' w-full h-full  group overflow-hidden rounded-md'>
      {products?.imageUrl ? (
       <div className='flex gap-5'>

        <div className='w-2/3 flex flex-col gap-5'>
        <img src={products.imageUrl[0]} alt="" className='border border-gray-300 rounded-md'/>
          <img src={products.imageUrl[1]} alt="" className='border border-gray-300 rounded-md'/>
          <img src={products.imageUrl[2]} alt="" className='border border-gray-300 rounded-md'/>
         
        </div>
        
        
        <div className='sm:overflow-y-scroll  flex scroll-m-0'>
        {/* <img src={products.imageUrl[0]} 
          alt="ProductImage" 
          className='max-w-full max-h-full object-contain group-hover:scale-105 duration-300' /> */}

          <ul className='grid grid-cols-1   sm:h-screen'>
          {
            (products.imageUrl).map((item,index)=>(
              <li key={index}>
                <img src={item} 
          alt="ProductImage" 
          className='max-w-full  max-h-full object-contain group-hover:scale-105 duration-300' />
              </li>
            ))
          }
          </ul>
          
        </div>
        
       </div>
         
       
      ) : (
        <p>Loading product details...</p>
      )}
       </div>
      <div className='sm:px-10 sm:pt-20'>
      <ProductInfo product={products} />
      </div>
    </Container>
  );
};

export default SingleProduct;
