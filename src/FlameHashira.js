import React from "react";

import { useState, useEffect, useRef } from "react";

function getRandomInt(min, max) {
  if (min > max) {
    [min, max] = [max, min];
  }
  min = Math.floor(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default function FlameHashira() {
  const [index, setIndex] = useState(0);
  const variablesRef = useRef({
    x: window.innerWidth * 0.5,
    y: window.innerHeight * 0.1,
    dim: 80,
    action: "Idle",
    passive: "Right",
    disable_skill: false,
    jump_time: 0,
    element: "fire",
    type: "ninja",
    spawn_time: 0,
  });
  const idleTimeout = useRef(null);
  const mirror = variablesRef.current.passive === "Left" ? true : false;
  const widthBoundary = [window.innerWidth * 0.2, window.innerWidth * 1.0];
  const heightBoundary = [
    window.innerHeight * -0.05,
    window.innerHeight * 1.05,
  ];

  const resetIdleTimeout = () => {
    if (idleTimeout.current) {
      clearTimeout(idleTimeout.current);
    }
    idleTimeout.current = setTimeout(() => {
      variablesRef.current.action = "Idle";
    }, 1000);
  };

  useEffect(() => {
    const tick = () => {
      setIndex((i) => (i + 0.5 >= 1000 ? 0 : i + 0.5));
      if (
        variablesRef.current.action === "Run" ||
        variablesRef.current.action === "Jump"
      ) {
        if (variablesRef.current.passive === "Left")
          variablesRef.current.x -= 2;
        else if (variablesRef.current.passive === "Right")
          variablesRef.current.x += 2;
      } else if (variablesRef.current.action === "Climb")
        variablesRef.current.y -= 2;
      else if (variablesRef.current.action === "Glide")
        variablesRef.current.y += 2;

      if (variablesRef.current.jump_time > 0) {
        if (variablesRef.current.jump_time > 10) variablesRef.current.y -= 2;
        else variablesRef.current.y += 2;

        variablesRef.current.jump_time -= 1;
      }

      if (variablesRef.current.spawn_time > 0) {
        if (variablesRef.current.spawn_time === 1) {
          variablesRef.current.type =
            variablesRef.current.type === "ninja" ? "kunoichi" : "ninja";
        }
        variablesRef.current.spawn_time -= 1;
      }

      if (variablesRef.current.x < widthBoundary[0]) {
        variablesRef.current.x = widthBoundary[1];
      } else if (variablesRef.current.x > widthBoundary[1]) {
        variablesRef.current.x = widthBoundary[0];
      }

      if (variablesRef.current.y < heightBoundary[0]) {
        variablesRef.current.y = heightBoundary[1];
      } else if (variablesRef.current.y > heightBoundary[1]) {
        variablesRef.current.y = heightBoundary[0];
      }
    };

    const interval = setInterval(tick, 50);
    return () => clearInterval(interval);
  }, []);

  const handleKeyDown = (event) => {
    let relevantKey = true;
    switch (event.key) {
      case "ArrowUp":
        if (variablesRef.current.disable_skill) break;
        else {
          variablesRef.current.y -= 2;
          variablesRef.current.action = "Climb";
        }
        break;
      case "ArrowDown":
        if (variablesRef.current.disable_skill) break;
        else {
          variablesRef.current.y += 2;
          variablesRef.current.action = "Glide";
        }
        break;
      case "ArrowLeft":
        if (variablesRef.current.disable_skill) break;
        variablesRef.current.passive = "Left";
        variablesRef.current.action = "Run";
        variablesRef.current.x -= 2;
        break;
      case "ArrowRight":
        if (variablesRef.current.disable_skill) break;
        variablesRef.current.passive = "Right";
        variablesRef.current.action = "Run";
        variablesRef.current.x += 2;
        break;
      case "a":
        if (variablesRef.current.disable_skill) break;
        else {
          variablesRef.current.action = "Attack";
        }
        break;
      case " ":
        if (variablesRef.current.jump_time === 0) {
          variablesRef.current.jump_time = 20;
          variablesRef.current.action = "Jump";
        }

        break;
      case "s":
        if (
          variablesRef.current.action === "Idle" ||
          variablesRef.current.action === "Run"
        )
          variablesRef.current.spawn_time = 15;
        break;
      case "d":
        variablesRef.current.element =
          variablesRef.current.element === "fire" ? "water" : "fire";
        break;
      default:
        relevantKey = false;
        break;
    }
    if (relevantKey) {
      resetIdleTimeout();
    }
  };
  console.log(variablesRef.current.action);
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      if (idleTimeout.current) {
        clearTimeout(idleTimeout.current);
      }
    };
  }, []);

  const style = {
    position: "absolute",
    left: `${variablesRef.current.x}px`,
    top: `${variablesRef.current.y}px`,
    width: `${variablesRef.current.dim}px`,
    height: `${variablesRef.current.dim}px`,
    transform: mirror ? "scaleX(-1)" : "scaleX(1)",
  };

  const out_index = Number.isInteger(index) ? index : index - 0.5;

  const image_src = `./assets/images/${variablesRef.current.type}/${
    variablesRef.current.action
  }__00${out_index % 10}.png`;

  let effect_src = "./assets/effects/";
  if (variablesRef.current.element === "fire") {
    effect_src += `flame_${out_index % 49 < 10 ? "0" : ""}${
      out_index % 49
    }.png`;
  } else {
    effect_src += `water900${out_index % 42 < 10 ? "0" : ""}${
      out_index % 42
    }.png`;
  }
  let spawn_src = null;
  if (variablesRef.current.element === "water") {
    spawn_src = `./assets/spawn/water${out_index % 12}.png`;
  } else {
    spawn_src = `./assets/spawn/${(out_index % 12) + 7 < 10 ? "0" : ""}${
      (out_index % 12) + 7
    }.png`;
  }

  console.log(spawn_src);

  const opacity = index > 500 ? (1000 - index) / 1000 : index / 1000;
  let out_opacity =
    variablesRef.current.element === "fire" ? opacity + 0.2 : opacity;

  return (
    <div className="character" style={style}>
      <div style={{ position: "relative", width: "100%", height: "100%" }}>
        <img
          src={image_src}
          alt="Character"
          style={{ width: "100%", height: "100%", objectFit: "contain" }}
        />
        <img
          src={effect_src}
          alt="Element Effect"
          style={{
            position: "absolute",
            top: -50,
            left: -45,
            width: "200%",
            height: "200%",
            objectFit: "contain",
            opacity: out_opacity,
            pointerEvents: "none",
          }}
        />
        {variablesRef.current.spawn_time > 0 && (
          <img
            src={spawn_src}
            alt="Spawn Effect"
            style={{
              position: "absolute",
              top: variablesRef.current.type === "ninja" ? -35 : -35,
              left: variablesRef.current.type === "ninja" ? -35 : -35,
              width: "200%",
              height: "200%",
              objectFit: "contain",
              opacity: 0.9,
              pointerEvents: "none",
            }}
          />
        )}
      </div>
    </div>
  );
}
