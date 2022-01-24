import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div>
      <header>
        <Link to="/">
          <button>HomePage</button>
        </Link>
        <Link to="/users">
          <button>Users</button>
        </Link>
        <Link to="/actions">
          <button>Actions</button>
        </Link>
      </header>
    </div>
  );
}
