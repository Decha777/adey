import React from "react";
import { useState, useRef } from "react";
import PageLayout from "../../../components/layout";
// import { products } from "../../dummy_data";

export default function AddProduct() {
  const [product, setProduct] = useState([]);

  const titleRef = useRef();
  const descRef = useRef();
  const priceRef = useRef();
  const imgRef = useRef();

  // const handleSideEffect = async (arg) => {
  //     const response = await fetch("/api/products/", {
  //     method: "POST",
  //     body: JSON.stringify(arg),
  //     headers: {
  //         "Content-Type": "application/json",
  //     },
  //     });
  //     const data = await response.json();
  //     console.log(data);
  // };
  const handleSubmit = (event) => {
    event.preventDefault();
    const title = titleRef.current.value;
    const desc = descRef.current.value;
    const price = priceRef.current.value;
    const img = imgRef.current.value;

    const newproduct = {
      title,
      desc,
      price,
      img,
    };
    setProduct(newproduct);
    fetch("/api/products/", {
      method: "POST",
      body: JSON.stringify(product),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
  };
  console.log(product);
  return (
    <PageLayout>
      <form action="" className="productForm" onSubmit={handleSubmit}>
        <div className="productForm__div">
          <label htmlFor="title" className="productForm__label"></label>
          <input
            type="text"
            name="title"
            id="title"
            ref={titleRef}
            className="productForm__input"
            placeholder="title"
          />
        </div>
        <div className="productForm__div">
          <label htmlFor="desc" className="productForm__label"></label>
          <input
            type="text"
            name="desc"
            id="desc"
            ref={descRef}
            className="productForm__input"
            placeholder="description"
          />
        </div>
        <div className="productForm__div">
          <label htmlFor="price" className="productForm__label"></label>
          <input
            type="text"
            name="price"
            id="price"
            ref={priceRef}
            className="productForm__input"
            placeholder="price"
          />
        </div>
        <div className="productForm__div">
          <label htmlFor="img" className="productForm__label"></label>
          <input
            type="file"
            name="img"
            id="img"
            ref={imgRef}
            className="productForm__input"
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </PageLayout>
  );
}
