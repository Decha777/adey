import React from "react";
import Header from "./Header";

const header = [
  {
    id: 1,
    link: "/",
    name: "home",
  },
  {
    id: 2,
    link: "/product",
    name: "Product",
  },
  {
    id: 3,
    link: "/blog",
    name: "Blog",
  },

  {
    id: 4,
    link: "/contact",
    name: "Contact Us",
  },
  {
    id: 5,
    link: "/about",
    name: "About Us",
  },
];

export default function PageLayout(pageProps) {
  return (
    <>
      <Header headerProps={header} />
      {pageProps.children}
    </>
  );
}
