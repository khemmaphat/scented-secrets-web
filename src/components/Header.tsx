import React from "react";

export const Header: React.FC = () => {
  return (
    <nav className="bg-gray-50">
      <div className="container">
        <ul className="list-none">
          <li>
            <a href="/" className="px-3 py-2 block hover:bg-gray-700">
              Home
            </a>
          </li>
          <li>
            <a href="/about" className="px-3 py-2 block hover:bg-gray-700">
              About
            </a>
          </li>
          <li>
            <a href="/mix" className="px-3 py-2 block hover:bg-gray-700">
              Mixed
            </a>
          </li>
          <li>
            <a href="/recommend" className="px-3 py-2 block hover:bg-gray-700">
              Recommend
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};
