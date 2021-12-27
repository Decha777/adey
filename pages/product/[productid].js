import React from "react";
import PageLayout from "../../components/layout";

import { useRouter } from "next/router";

export default function ProductDetail() {
  const { query } = useRouter();

  return (
    <PageLayout>
      <h1>Product Detail Page {`${query.productid}`}</h1>
    </PageLayout>
  );
}
