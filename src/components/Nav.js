import React, { useEffect, useState } from "react";
import "./Nav.css";

export default function Nav() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      console.log(window.scrollY);

      if (window.scrollY > 50) {
        setShow(true);
      } else {
        setShow(false);
      }

      return () => {
        window.removeEventListener("scroll", () => {});
      };
    });
  }, []);

  return (
    <nav className={`nav ${show && "nav__black"}`}>
      <img
        alt="Netflix Logo"
        src="https://upload.wikimedia.org/wikipedia/commons/e/ea/Netflix_Logomark.png"
        className="nav__logo"
        onClick={() => window.location.reload()}
      />
      <img
        alt="User Logged"
        src="https://occ-0-2218-395.1.nflxso.net/dnm/api/v6/vN7bi_My87NPKvsBoib006Llxzg/AAAABdSQ4873e87QYqrBeV0u9scGTfwDT2o9w3ZAKxLE8b7XB4alWnzdXel8sJz5GHTLKL0eAbaEZAbIff0Z1JQPs28uONtAi28.png?r=c5e"
        className="nav__avatar"
      />
    </nav>
  );
}
