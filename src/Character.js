import React from "react";
// import Attack from "./assets/images/Attack__000.png"; // Update the path as necessary
// import { useState, useEffect } from "react";
let index = 0;
let old_action = "Idle";
const img_dim = 80;
const img_scale = 1.2;

const y_correction = (img_dim * img_scale) / 20;
const x_correction = (img_dim * img_scale) / 5;

export default function Character({ x, y, action, passive }) {
  const mirror = passive === "Left" ? true : false;
  action = action === "Left" || action === "Right" ? "Run" : action;
  if (action !== old_action) index = 0;

  old_action = action;

  const need_scaling = action === "Attack" || action === "Jump_Attack";

  const dim = need_scaling ? Number(img_dim * img_scale) : img_dim;

  if (action === "Attack" || action === "Jump_Attack") {
    //corection
    y -= y_correction;
    if (passive === "Left") x -= x_correction;

    // dash

    if (action === "Attack") {
      x -= passive === "Left" ? x_correction * 3 : -x_correction * 3;
    }
  }

  const style = {
    position: "absolute",
    left: `${x}px`,
    top: `${y}px`,
    width: `${dim}px`,
    height: `${dim}px`,
    transform: mirror ? "scaleX(-1)" : "scaleX(1)",
  };

  const out_index = Number.isInteger(index) ? index : index - 0.5;

  const image_src = "./assets/images/" + action + `__00${out_index}.png`;
  index = (index + 1) % 10;

  return (
    <div className="character" style={style}>
      <img
        src={image_src}
        alt="Character"
        style={{ width: "100%", height: "100%", objectFit: "contain" }}
      />
    </div>
  );
}
