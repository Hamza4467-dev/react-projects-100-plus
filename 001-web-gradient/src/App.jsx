import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

function App() {
  const [num, setNum] = useState(12);
  const [type, setType] = useState("linear");
  const [gradients, setGradient] = useState([]);
  const getHexaColorCode = () => {
    const rgb = 255 * 255 * 255;
    const random = Math.random() * rgb;
    const integer = Math.floor(random);
    const hexaCode = integer.toString(16);
    const colorHexaCode = hexaCode.padEnd(6, "0");
    return `#${colorHexaCode}`;
  };
  const generateGradient = () => {
    const colors = [];
    for (let i = 0; i < num; i++) {
      const colorOne = getHexaColorCode();
      const colorTwo = getHexaColorCode();
      const degree = Math.floor(Math.random() * 360);
      const degreeSring = `${degree}deg`;
      if (type === "linear") {
        colors.push({
          gradient: `linear-gradient(${degreeSring} ,${colorOne} ,${colorTwo})`,
          css: `background: 'linear-gradient(${degreeSring} ,${colorOne} ,${colorTwo})'`,
        });
      } else {
        colors.push({
          gradient: `linear-gradient(${degreeSring} ,${colorOne} ,${colorTwo})`,
          css: `background: 'linear-gradient(${degreeSring} ,${colorOne} ,${colorTwo})'`,
        });
      }
    }
    setGradient(colors);
  };

  useEffect(() => {
    generateGradient();
  }, [num, type]);

  const isCopy = (copyText) => {
    navigator.clipboard.writeText(copyText);
    toast.success("gradient code copied");
  };
  return (
    <div className="m-h-screen bg-white p-12">
      <div className="w-9/12 mx-auto">
        <div className="flex justify-between">
          <h1 className="text-3xl font-bold">Gradient Generator</h1>
          <div className="flex gap-4">
            <input
              type="text"
              className="border bg-white border-slate-300 rounded-lg w-[200px] p-2"
              placeholder="12"
              onChange={(e) => setNum(Number(e.target.value))}
              value={num}
            />
            <select
              className="border bg-white border-slate-300 rounded-lg w-[200px] p-2"
              onChange={(e) => setType(e.target.value)}
              value={type}
            >
              <option value="linear">Linear</option>
              <option value="radial">Radial</option>
            </select>
            <button
              onClick={generateGradient}
              className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 py-2 font-medium shadow"
            >
              Generate
            </button>
          </div>
        </div>
        <div className="grid grid-cols-4 gap-4">
          {gradients.map((item, index) => (
            <div
              key={index}
              className="h-[180px] rounded-xl relative"
              style={{ background: item.gradient }}
            >
              <button
                onClick={() => isCopy(item.css)}
                className="bg-black/50 hover:bg-black text-white rounded absolute bottom-3 right-3 px-2 py-1 text-[10px]"
              >
                Copy
              </button>
            </div>
          ))}
        </div>
      </div>
      <ToastContainer></ToastContainer>
    </div>
  );
}

export default App;
