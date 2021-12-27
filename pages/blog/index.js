import React from "react";
import { useState, useEffect } from "react";
import PageLayout from "../../components/layout";

import Image from "next/image";
import Link from "next/link";

export default function Blog() {
  const [blogs, setBlogs] = useState([]);
  const [blog, setBlog] = useState("");

  const fetchData = async () => {
    const response = await fetch("/api/blog");
    const data = await response.json();
    setBlogs(data);
  };

  const submitBlog = async () => {
    const response = await fetch("/api/blog", {
      method: "POST",
      body: JSON.stringify({ blog }),
      headers: {
        "Content-type": "Application/json",
      },
    });
    const data = await response.json();
    console.log(data);
  };
  useEffect(() => {
    fetchData();
  }, []);

  const { blogs: data } = blogs;
  // console.log(blogs.blogs[0].title);
  console.log(data);
  return (
    <>
      <PageLayout>
        <h1>Blog Page</h1>
        {data &&
          data.map((b) => {
            return (
              <main key={b.id}>
                <h2>{b.title}</h2>;
                <Image
                  src={`${b.img}`}
                  alt={`${b.id}`}
                  width="120px"
                  height="120px"
                />
                <Link href={`/blog/${b.id}`}>See More</Link>
              </main>
            );
          })}
        <h2>New Blog</h2>
        <input
          type="text"
          value={blog}
          onChange={(e) => setBlog(e.target.value)}
        />
        <button type="submit" onClick={submitBlog}>
          Submit
        </button>
      </PageLayout>
    </>
  );
}
