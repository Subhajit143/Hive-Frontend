import React from "react";
import NewArrival from "./NewArrival";
import Banner from "../components/Banner";
import Container from "../components/Container";
import CategoryHome from "./CategoryHome";
import SpbyCategory from "./SpbyCategory";
import Modal from "./Modal";
import Banner2 from "./Banner2";

const Home = () => {
  return (
    <main>
      {/* Banner Section */}
      <Banner />

      {/* New Arrival Section */}
      
        <NewArrival />
        {/* <Banner2 /> */}
      
      {/* Special By Category Section */}
      <SpbyCategory />
      <Modal />

      {/* Category Home Section */}
      {/* <div className="mt-10 bg-gray-100 py-10"> 
        <CategoryHome />
      </div> */}
    </main>
  );
};

export default Home;