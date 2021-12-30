// react modules
import React from "react";

// custom components
import PageLayout from "../../components/layout";

// next moduels
// import { useRouter } from "next/router";
import Image from "next/image";

// React Component
export default function ProductDetail({ product }) {
  // params
  // export const { query } = useRouter();
  // console.log(product);
  product = [];
  return (
    <PageLayout>
      <h1>Product Detail </h1>
      <h3>{product.title}</h3>
      <Image
        src={product.img}
        alt={product.title}
        width="350px"
        height="350px"
      />
      <p>{product.des}</p>
      <h2>{product.price}</h2>
    </PageLayout>
  );
}

// // fetch data
// export async function getStaticProps() {
//   const response = await fetch(`/api/products/1640774450278`);
//   const data = await response.json();
//   return {
//     props: {
//       product: data,
//     },
//   };n
// }
