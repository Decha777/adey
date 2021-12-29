// React Modules
import React from "react";

// node modules
import fs from "fs";
import path from "path";

// next modules
import Image from "next/image";

// Custom components
import PageLayout from "../../components/layout";

export default function Profile({ users }) {
  // console.log(users);
  return (
    <PageLayout>
      <h1>Profile Pager</h1>
      {users.map((user) => {
        return (
          <div key={user.id} className="card">
            <h1>{user.userName}</h1>
            <Image
              src={user.avator}
              alt={user.userName}
              width="150px"
              height="150px"
            />
          </div>
        );
      })}
    </PageLayout>
  );
}

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), "data", "users.json");
  const fileData = fs.readFileSync(filePath);
  const data = JSON.parse(fileData);
  return {
    props: {
      users: data,
    },
  };
}
