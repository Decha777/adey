import React from "react";
import PageLayout from "../../components/layout";

import { useRouter } from "next/router";

export default function BlogDetailes() {
  const { query } = useRouter();
  console.log(query);
  return (
    <PageLayout>
      <h1>Blog Detail Page {`${query.blogid}`}</h1>
    </PageLayout>
  );
}
