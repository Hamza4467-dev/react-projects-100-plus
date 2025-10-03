import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "remixicon/fonts/remixicon.css";

const avatarStyles = [
  {
    label: "Illustration",
    value: "illustration",
    url: "https://api.dicebear.com/7.x/avataaars/svg?seed=",
  },
  {
    label: "Cartoon",
    value: "cartoon",
    url: "https://api.dicebear.com/7.x/adventurer/svg?seed=",
  },
  {
    label: "Sketchy",
    value: "sketchy",
    url: "https://api.dicebear.com/7.x/croodles/svg?seed=",
  },
  {
    label: "Robots",
    value: "robots",
    url: "https://api.dicebear.com/7.x/bottts/svg?seed=",
  },
  {
    label: "Pixel Art",
    value: "Art",
    url: "https://api.dicebear.com/7.x/pixel-art/svg?seed=",
  },
  {
    label: "Male",
    value: "male",
    url: "https://randomuser.me/api/portraits/men",
  },
  {
    label: "Female",
    value: "female",
    url: "https://randomuser.me/api/portraits/women",
  },
];
function App() {
  const [src, setSrc] = useState(null);
  const [option, setOption] = useState("male");
  const generateNumforPerson = () => {
    const finalNum = Math.floor(Math.random() * 99) + 1;
    return finalNum;
  };
  const generate = () => {
    const obj = avatarStyles.find((item) => item.value === option);
    const url = obj.url;
    if (option === "male" || option === "female") {
      const imageUrl = `${url}/${generateNumforPerson()}.jpg`;
      setSrc(imageUrl);
    } else {
      const uniqueValue = Date.now();
      const imageUrl = `${url}${uniqueValue}`;
      setSrc(imageUrl);
    }
  };
  const optionChange = (e) => {
    const value = e.target.value;
    setOption(value);
  };
  const download = (url) => {
    const a = document.createElement("a");
    a.href = url;
    a.download = `${Date.now()}.jpeg`;
    a.click();
    a.remove();
  };
  const copy = (url) => {
    navigator.clipboard.writeText(url);
    toast.success("url code copied");
  };
  useEffect(() => {
    generate();
  }, [option]);
  return (
    <>
      <div className="min-h-screen p-12 bg-gradient-to-br from-slate-900 via-slate-900 flex items-center justify-center">
        <div className="text-white w-full max-w-md rounded shadow-xl backdrop-blur-xl border border-slate-700 p-10 flex justify-center flex-col items-center">
          <img
            src={src || "/avatar.png"}
            alt="avatart image"
            className="w-32 h-32 rounded-full border-4 border-slate-700 shadow-lg object-cover"
          />
          <div className="text-center">
            <h1 className="text-3xl font-bold">Avatar Generatore</h1>
            <p className="text-slate-300 ">
              Generate ulimited avatar for your websites
            </p>
          </div>
          <div className="space-y-4 w-full">
            <select
              className="bg-slate-900/60 w-full p-3 rounded-xl"
              value={option}
              onChange={optionChange}
            >
              {avatarStyles.map((item, index) => {
                return (
                  <option value={item.value} key={index}>
                    {item.label}
                  </option>
                );
              })}
            </select>
            <div className="bg-slate-900/60 w-full p-3 rounded-xl">{src}</div>
          </div>
          <div className="w-full flex gap-4 mt-4">
            <button
              className="flex-1 bg-gradient-to-r from-rose-500 to-orange-600 font-medium rounded-lg py-2 hover:scale-105 transition-transform flex items-center justify-center"
              onClick={generate}
            >
              <i className="ri-refresh-line mr-2"></i>
              Change
            </button>

            <button
              className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 font-medium rounded-lg py-2 hover:scale-105 transition-transform flex items-center justify-center"
              onClick={() => download(src)}
            >
              <i className="ri-download-2-line mr-2"></i>
              Download
            </button>

            {/* Copy Button */}
            <button
              className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-600 font-medium rounded-lg py-2 hover:scale-105 transition-transform flex items-center justify-center"
              onClick={() => copy(src)}
            >
              <i className="ri-file-copy-line mr-2"></i>
              Copy
            </button>
          </div>
        </div>
        <ToastContainer></ToastContainer>
      </div>
    </>
  );
}

export default App;
