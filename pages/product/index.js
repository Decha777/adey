import fs from "fs";
import path from "path";

import Image from "next/image";

import PageLayout from "../../components/layout";

export default function ProductPage({ products }) {
  return (
    <PageLayout>
      {products.map((product) => {
        return (
          <ul key={product.id}>
            <h1>{product.title}</h1>
            <Image
              src={product.img}
              alt={product.title}
              width="120px"
              height="120px"
            />
            <p>{product.desc}</p>
          </ul>
        );
      })}
    </PageLayout>
  );
}

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), "data", "product.json");
  const JsonData = fs.readFileSync(filePath);
  const data = JSON.parse(JsonData);
  // console.log(data);
  return {
    props: {
      products: data,
    },
  };
}
