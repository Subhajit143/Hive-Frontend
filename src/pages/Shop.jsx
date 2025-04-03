import React, { useEffect, useState } from "react";
import axios from "axios";
import Container from "../components/Container";
import Product from "./Product";
import { TbFilterPlus } from "react-icons/tb";

const Shop = () => {
  const [product, setProduct] = useState([]);
  const [category, setCategory] = useState([]);
  const [filterProducts, setFilterProducts] = useState([]);
  const [open, setOpen] = useState(false);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/admin/getProducts");
      const data = response.data;
      setProduct(data);
    } catch (error) {
      console.log(error);
    }
  };

  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setCategory((prev) => [...prev, e.target.value]);
    }
  };

  const handleOpen = () => {
    setOpen(!open);
  };

  const applyFilter = () => {
    let productCopy = product.slice();
    if (category.length > 0) {
      productCopy = productCopy.filter((item) => category.includes(item.category));
    }
    setFilterProducts(productCopy);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    applyFilter();
  }, [category]);

  return (
    <div className="flex flex-col relative min-w-fit">
      {/* Navbar */}
      <div className="bg-gray-200 py-5 text-2xl font-semibold opacity-55 sm:mt-0 mt-20">
        <Container>
          <h1>SHOP</h1>
        </Container>
      </div>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={handleOpen}
        ></div>
      )}

      <Container className="py-5 sm:flex sm:flex-row flex-col relative">
        {/* Filter Sidebar */}
        <div className="hidden md:block flex-col gap-10 py-10">
          <div>
            <p className="font-semibold py-5">Category</p>
            <p className="flex gap-2">
              <input type="checkbox" className="w-3" onChange={toggleCategory} value={"Men"} /> MEN
            </p>
            <p className="flex gap-2">
              <input type="checkbox" className="w-3" onChange={toggleCategory} value={"Women"} /> WOMEN
            </p>
            <p className="flex gap-2">
              <input type="checkbox" className="w-3" onChange={toggleCategory} value={"Kids"} /> KIDS
            </p>
          </div>

          <div>
            <p className="font-semibold py-5">Material</p>
            <p className="flex gap-2">
              <input type="checkbox" className="w-3" value={"Fabric"} /> Fabric
            </p>
            <p className="flex gap-2">
              <input type="checkbox" className="w-3" value={"Polyster"} /> Polyster
            </p>
            <p className="flex gap-2">
              <input type="checkbox" className="w-3" value={"Cotton"} /> Cotton
            </p>
            <p className="flex gap-2">
              <input type="checkbox" className="w-3" value={"Mix Cotton"} /> Mix Cotton
            </p>
          </div>
        </div>

        {/* Mobile Filter Button */}
        <div className="sm:hidden block">
          <button onClick={handleOpen} className="border border-neutral-600 border-opacity-70 p-2 flex">
            Filter <span className="pt-1 pl-1"><TbFilterPlus /></span>
          </button>
        </div>

        {/* Mobile Filter Panel */}
        {open && (
          <div className="fixed bottom-0 shadow-6xl left-0 border z-50 transition ease-in-out duration-500 overflow-scroll bg-white h-[60%] w-full">
            {/* Filter Content */}
            <div className="p-4">
              <p className="font-semibold py-5">Category</p>
              <p className="flex gap-2">
                <input type="checkbox" className="w-3" onChange={toggleCategory} value={"Men"} /> MEN
              </p>
              <p className="flex gap-2">
                <input type="checkbox" className="w-3" onChange={toggleCategory} value={"Women"} /> WOMEN
              </p>
              <p className="flex gap-2">
                <input type="checkbox" className="w-3" onChange={toggleCategory} value={"Kids"} /> KIDS
              </p>
            </div>
          </div>
        )}

        {/* Product List */}
        <div className="flex flex-col">
          <div className="mb-4 text-sm font-semibold opacity-50 text-gray-700 py-5">
            {Array.isArray(filterProducts) && filterProducts.length > 0
              ? `Showing 1 - ${filterProducts.length} products of ${product.length} results`
              : `Showing 1 - ${product.length} products of ${product.length} results`}
          </div>

          {Array.isArray(filterProducts) && filterProducts.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 text-gray-500 md:grid-cols-4 sm:gap-2">
              {filterProducts.map((item) => (
                <Product key={item?.id} item={item} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 text-gray-500 md:grid-cols-4 gap-2">
              {product.map((item) => (
                <Product key={item?.id} item={item} />
              ))}
            </div>
          )}
        </div>
      </Container>
    </div>
  );
};

export default Shop;