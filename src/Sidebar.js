import React from "react";
import GitHub from "./assets/icons/hub.png";
import linkedin from "./assets/icons/lnk.png";

export default function Sidebar() {
  return (
    <>
      <div className="sidebar">
        <p className="error">Contact me on</p>
        <ul>
          <li>
            <a href="https://github.com/jankoetf">
              <img src={GitHub} alt="Git" /> GitHub
            </a>
          </li>
          <li>
            <a href="https://www.linkedin.com/in/jankomitrovic/">
              <img src={linkedin} alt="linkedin" />
              Linkedin
            </a>
          </li>
        </ul>

        <div className="dizajn">
          <img
            src={"./assets/logos/4.png"}
            alt="Logo"
            style={{
              position: "relative",
              bottom: 0,
              left: 0,
              width: "100%",
              height: "100%",
              // objectFit: "contain",
              opacity: 0.9,
              // pointerEvents: "none",
            }}
          />
        </div>
      </div>
    </>
  );
}
