import React from "react";
import Card from "../../Common/card";

const ProductMart = () => {
  return (
    <>
      <div className="w-full">
        <h2 className="text-[40px] font-medium mb-5">Product With Filters </h2>
        <div className="flex flex-wrap gap-[30px] mb-[20px]">
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
        </div>
      </div>
    </>
  );
};

export default ProductMart;
