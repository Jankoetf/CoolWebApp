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
      </div>
    </>
  );
}
