import React from "react";

import Link from "next/link";

export default function Header({ headerProps }) {
  return (
    <>
      <nav className="headerNav">
        <div className="headerNav__logo">
          <Link href="/">logo</Link>
        </div>
        <ul className="headerNav__item">
          {headerProps.map((item) => {
            return (
              <li key={item.id}>
                <Link href={item.link}>{item.name}</Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}
