import Sidebar from "./Sidebar";
import Header from "./Header";
import Character from "./Character";
import { useState, useEffect } from "react";

function getRandomInt(min, max) {
  if (min > max) {
    [min, max] = [max, min];
  }
  min = Math.floor(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default function App() {
  const initial_position = {
    x: window.innerWidth / 3 + 20,
    y: window.innerHeight / 1.4,
  };
  const [{ x, y }, setPosition] = useState(initial_position);
  const [{ active_action, passive_action, active_time }, setAction] = useState({
    active_action: "Idle", // Idle, Left, Right, Climb, Glide, Random_Teleport, Attack, Jump_attack
    passive_action: "Right", //Left, Right
    active_time: 0,
  });
  const [disable_skill, setDisable] = useState(false);

  const handleKeyDown = (event) => {
    switch (event.key) {
      case "ArrowUp":
        if (disable_skill) break;
        else {
          setPosition((pos) => ({ x: pos.x, y: pos.y - 6 }));
          setAction((action) => ({
            ...action,
            active_action: "Climb",
          }));
        }
        break;
      case "ArrowDown":
        if (disable_skill) break;
        else {
          setAction((action) => ({ ...action, active_action: "Glide" }));
          setPosition((pos) => ({ x: pos.x, y: pos.y + 6 }));
        }
        break;
      case "ArrowLeft":
        if (disable_skill) break;
        setPosition((pos) => ({ x: pos.x - 8, y: pos.y }));
        setAction((action) => ({
          ...action,
          active_action: "Left",
          passive_action: "Left",
        }));

        break;
      case "ArrowRight":
        if (disable_skill) break;
        setPosition((pos) => ({ x: pos.x + 8, y: pos.y }));
        setAction((action) => ({
          ...action,
          active_action: "Right",
          passive_action: "Right",
        }));
        break;
      case "a":
        if (disable_skill) break;
        else {
          setAction((a) => ({ ...a, active_action: "Attack", active_time: 8 }));
          setDisable((d) => true);
          setTimeout(() => {
            setDisable((d) => false);
            setAction((action) => ({ ...action, active_action: "Idle" }));
          }, 1000);
        }
        break;
      case " ":
        if (disable_skill) break;
        else {
          setAction((a) => ({
            ...a,
            active_action: "Jump_Attack",
            active_time: 8,
          }));
          setDisable((d) => true);
          setTimeout(() => {
            setDisable((d) => false);
            setAction((action) => ({ ...action, active_action: "Idle" }));
          }, 1000);
        }
        break;
      case "r":
        if (disable_skill) break;
        setPosition((pos) => ({
          ...pos,
          x: initial_position.x,
          y: initial_position.y,
        }));
        setAction((action) => ({ ...action, active_action: "Idle" }));
        break;
      case "s":
        setPosition((pos) => ({
          x: getRandomInt(
            (window.innerWidth / 3 + 20) * 1.1,
            (window.innerWidth / 3 + 20) * 2.5
          ),
          y: getRandomInt(
            (window.innerHeight / 1.4) * 0.3,
            (window.innerHeight / 1.4) * 1.1
          ),
        }));
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  console.log(active_action, active_time, disable_skill);

  if (active_time > 0) {
    if (active_action === "Attack") {
      setTimeout(() => {
        setAction((a) => ({ ...a, active_time: active_time - 0.5 })); //setActive((a) => a - 1); in production
        // setPassive((p) => "Attack");
      }, 70);
    } else if (active_action === "Jump_Attack") {
      setTimeout(() => {
        if (active_time <= 5) {
          setPosition((pos) => ({ x: pos.x, y: pos.y + 2 }));
        } else {
          setPosition((pos) => ({ x: pos.x, y: pos.y - 2 }));
        }

        setAction((a) => ({ ...a, active_time: active_time - 0.5 }));
      }, 70);
    }
  }

  return (
    <div className="App">
      <Sidebar />
      <Header />
      {/* <Character x={x} y={y} action={active_action} passive={passive_action} /> */}
    </div>
  );
}
