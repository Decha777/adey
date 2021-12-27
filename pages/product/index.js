import React from "react";
import { useState, useEffect } from "react";
import PageLayout from "../../components/layout";
import Image from "next/image";

export default function Product() {
  const [products, setProduct] = useState([]);

  const fetchData = async () => {
    const response = await fetch("/api/products");
    const data = await response.json();

    setProduct(data);
  };

  useEffect(() => {
    fetchData();
  }, []);
  const { products: data } = products;

  return (
    <>
      <PageLayout>
        {data &&
          data.map((product) => {
            return (
              <article key={product.id}>
                <h1>{product.title}</h1>
                <Image
                  src={product.img}
                  alt={product.title}
                  width="150px"
                  height="150px"
                />
                <p>{product.detail}</p>
              </article>
            );
          })}
      </PageLayout>
      ;
    </>
  );
}
