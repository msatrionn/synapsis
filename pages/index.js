import dynamic from "next/dynamic";
import Header from "./Components/layouts/Header";
import React, { useState } from "react";
const Show = dynamic(() => import("./Components/Show"), {
  loading: () => <p>...</p>
});

const Home = () => {
  return (
    <div>
      <Header />
      <Show />
    </div>
  );
};
export default Home;
