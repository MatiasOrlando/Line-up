import { useState, useEffect, useRef } from "react";

const Contacto = () => {
  const [colors, setColors] = useState(["violet", "gray", "gray"]);
  const blocksRef = useRef(null);

  const handleClick = (index) => {
    const newColors = ["gray", "gray", "gray"];
    if (index === 0) {
      newColors[0] = "green";
      newColors[1] = colors[1] === "green" ? "green" : "violet";
      newColors[2] = colors[1] === "green" ? "violet" : "gray";
    } else if (index === 1) {
      newColors[0] = colors[0] === "green" ? "green" : "violet";
      newColors[1] = "green";
      newColors[2] = "violet";
    } else if (index === 2) {
      newColors[0] = colors[0] === "green" ? "green" : "violet";
      newColors[1] = colors[1] === "green" ? "green" : "violet";
      newColors[2] = "violet";
    }
    setColors(newColors);
  };

  const handleReset = () => {
    setColors(["violet", "gray", "gray"]);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (blocksRef.current && !blocksRef.current.contains(event.target)) {
        handleReset();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={blocksRef}>
      {colors.map((color, index) => (
        <div
          key={index}
          className={`box ${color}`}
          onClick={() => handleClick(index)}
        />
      ))}
    </div>
  );
};

export default Contacto;
