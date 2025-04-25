import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../store/auth.jsx";
import HiveLogo from "../assets/newlogo2-Black.png";
import SearchInput from "./SearchInput.jsx";
import { FaUser } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import { BsCartCheckFill } from "react-icons/bs";
import { RiMenu4Line } from "react-icons/ri";
import { useSelector } from "react-redux";
import Container from "./Container.jsx";
import { MdAdminPanelSettings } from "react-icons/md";
import axios from "axios";

const Navbar = () => {
  const [product, setProduct] = useState([]);
  const { isLoggedIn, isAdmin } = useAuth();
  const { cartItems } = useSelector((state) => state.hive);
  const [isOpen, setIsOpen] = useState(false);
  const handleToggleOpen = () => {
    setIsOpen(!isOpen);
  };
  const handleToggleClose = () => {
    setIsOpen(false);
  };
  const formdata = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/admin/getProducts"
      );

      const data = response.data;

      const sortedData = data[1];
      // const img= sortedData.imageUrl[0]

      // console.log(img);
      setProduct(sortedData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    formdata();
  }, []);
  console.log("Products from redux in navbar", cartItems);

  return (
    <>
      <div
        className={`hidden md:block sticky top-0 backdrop-blur-md z-50  shadow-md hover:bg-white duration-900`}
        onMouseEnter={handleToggleOpen}
        onMouseLeave={handleToggleClose}
      >
        {/* Main Navbar */}
        <div className="group relative">
          <Container className="flex justify-between text-gray-700 items-center lg:gap-7">
            {/* Navigation Links */}
            <div className="flex-1  ">
              {isOpen ? (
                <nav className="py-5  transition-all ease-in-out duration-500 ">
                  <ul className="flex gap-12 text-sm font-semibold">
                    <li>
                      <NavLink className="" to="/">
                        Home
                      </NavLink>
                    </li>
                    <li>
                      <NavLink className="" to="/shop">
                        Shop
                      </NavLink>
                    </li>
                    <li>
                      <NavLink className="" to="/pages">
                        Pages
                      </NavLink>
                    </li>
                    <li>
                      <NavLink className="" to="/element">
                        Elements
                      </NavLink>
                    </li>
                  </ul>
                </nav>
              ) : (
                <div className="text-3xl cursor-pointer">
                  <RiMenu4Line />
                </div>
              )}
            </div>

            {/* Logo */}
            <div className="flex-shrink-0 py-3">
              <NavLink to="/">
                <img src={HiveLogo} alt="Logo" className="w-[6.5rem]" />
              </NavLink>
            </div>

            {/* Right Section */}
            <div className="flex-1 flex justify-end">
              {isOpen ? (
                <ul className="flex gap-12 py-5 px-5 font-semibold">
                  {isLoggedIn ? (
                    <>
                      {isAdmin && (
                        <li>
                          <NavLink to="/admin">
                            {/* <button className=" text-black py-2 px-5 rounded-lg">
                            Admin
                          </button> */}
                            <MdAdminPanelSettings className="h-8 w-8" />
                          </NavLink>
                        </li>
                      )}
                      <li className="text-2xl flex place-items-center ">
                        <NavLink to="/logout">
                          <BiLogOut />
                        </NavLink>
                      </li>
                    </>
                  ) : (
                    <>
                      <li>
                        <NavLink to="/login">
                          <button className="uppercase py-2 px-5 text-sm rounded-lg">
                            Login
                          </button>
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to="/register">
                          <button className="uppercase py-2 px-3 text-sm rounded-lg">
                            Register
                          </button>
                        </NavLink>
                      </li>
                    </>
                  )}

                  <li className="text-2xl  flex place-items-center relative">
                    <NavLink to={"/Cart"}>
                      <BsCartCheckFill />
                      <span className="absolute -right-2 -top-0 w-4 h-4 rounded-full text-[12px] text-white flex items-center justify-center bg-slate-800">
                        {cartItems?.length > 0 ? cartItems.length : 0}
                      </span>
                    </NavLink>
                  </li>
                </ul>
              ) : (
                <div className="px-5 py-5">
                  <li className="text-2xl  flex place-items-center relative">
                    <NavLink to={"/Cart"}>
                      <BsCartCheckFill />
                      <span className="absolute -right-2 -top-1.5 w-4 h-4 rounded-full text-[12px] text-white flex items-center justify-center bg-slate-800">
                        {cartItems?.length > 0 ? cartItems.length : 0}
                      </span>
                    </NavLink>
                  </li>
                </div>
              )}
            </div>
          </Container>

          <hr className="border-t border-black opacity-20 " />
          {/* Hover Dropdown */}
          <div className="absolute left-0 right-0 z-10">
            <div
              className="  bg-white  backdrop-blur-md shadow-lg 
    opacity-0 translate-y-0 invisible 
    group-hover:opacity-100 group-hover:translate-y-0 group-hover:visible 
    transition-opacity   ease-in duration-700"
            >
              <nav className="py-5">
                <ul className="flex justify-center gap-12 text-sm font-semibold">
                  <li>
                    <NavLink className="hover:text-black " to="/">
                      New Arrivals
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className="hover:text-black" to="/shop">
                      Cult Favorites
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className="hover:text-black" to="/pages">
                      Clothing
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className="hover:text-black " to="/element">
                      Pants
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className="hover:text-black " to="/element">
                      Denim
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className="hover:text-yellow-400 " to="/element">
                      Tees
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className="hover:text-yellow-400 " to="/element">
                      Sweater
                    </NavLink>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>

        <hr className="border-t border-black opacity-20" />
      </div>

      {/* Mobile Navbar */}
      {/* Mobile Navbar */}
      <div className="md:hidden fixed  w-screen bg-white shadow-md z-50">
        <nav className=" flex  items-center">
          <ul className="flex justify-between items-center  w-full gap-12 py-2 px-5 font-semibold">
            {/* Menu Button */}
            <li>
              <button onClick={handleToggleOpen} className="text-2xl">
                <RiMenu4Line />
              </button>
            </li>

            {/* Logo */}
            <li>
              <NavLink to="/">
                <img src={HiveLogo} alt="Logo" className="w-[6.5rem]" />
              </NavLink>
            </li>

            {/* Cart Icon */}
            <li className="text-2xl  flex place-items-center relative pr-1">
              <NavLink to="/Cart" className="relative text-2xl -top-0.5">
                <BsCartCheckFill />
                <span className="absolute -right-2 -top-1 w-4 h-4 rounded-full text-[12px] text-white flex items-center justify-center bg-slate-800">
                  {cartItems?.length > 0 ? cartItems.length : 0}
                </span>
              </NavLink>
            </li>
          </ul>
        </nav>

        {/* Mobile Menu (Dropdown) */}
        {isOpen && (
          <div className="absolute top-full left-0 w-[70%] border   transition ease-in-out duration-500  overflow-scroll  bg-white  h-screen">
            <ul className="flex flex-col  gap-4 p-4 text-gray-700 font-semibold px-5 ">
              <li>
                <NavLink to="/" onClick={handleToggleClose}>
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/shop" onClick={handleToggleClose}>
                  Shop
                </NavLink>
              </li>
              <li>
                <NavLink to="/pages" onClick={handleToggleClose}>
                  Pages
                </NavLink>
              </li>
              <li>
                <NavLink to="/element" onClick={handleToggleClose}>
                  Elements
                </NavLink>
              </li>
            </ul>
            <hr className="w-full text-neutral-600" />
            <ul className="flex flex-col  gap-4 p-4 text-gray-700 font-semibold px-5 ">
              <li>
                <NavLink to="/shop" onClick={handleToggleClose}>
                  New Arrival
                </NavLink>
              </li>
              <li>
                <NavLink to="/shop" onClick={handleToggleClose}>
                  Cult Favourites
                </NavLink>
              </li>
              <li>
                <NavLink to="/pages" onClick={handleToggleClose}>
                  Clothing
                </NavLink>
              </li>
              <li>
                <NavLink to="/element" onClick={handleToggleClose}>
                  Pants
                </NavLink>
              </li>
              <li>
                <NavLink to="/element" onClick={handleToggleClose}>
                  Denims
                </NavLink>
              </li>
              <li>
                <NavLink to="/element" onClick={handleToggleClose}>
                  Tees
                </NavLink>
              </li>
              <li>
                <NavLink to="/element" onClick={handleToggleClose}>
                  Sweater
                </NavLink>
              </li>
              <li>
                <NavLink to="/element" onClick={handleToggleClose}>
                  Brands
                </NavLink>
              </li>
            </ul>

            <ul className="flex flex-col  gap-4 p-4 text-gray-700 font-semibold px-5 ">
              <li>
                {product?.imageUrl?.[0] && (
                  <NavLink
                    to={`/product/${product._id}`}
                    onClick={handleToggleClose}
                  >
                    <img src={product.imageUrl[0]} alt="" />
                  </NavLink>
                )}
              </li>
            </ul>
          </div>
        )}
      </div>
    </>
  );
};

export default Navbar;
