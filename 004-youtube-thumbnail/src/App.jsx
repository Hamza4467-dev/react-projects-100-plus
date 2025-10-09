import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import "remixicon/fonts/remixicon.css";
import getYouTubeID from "get-youtube-id";

const API_KEY = "CkXrWNmLSrO6jk7RE5N57sJcSEVkxESJjkTDBNL6Lg3JDXcEjaZ";
function App() {
  //   /tmp/institute/Desktop > ./test
  // 120x90
  // https://img.youtube.com/vi/VIDEO_ID/default.jpg

  // 320x180
  // https://img.youtube.com/vi/VIDEO_ID/mqdefault.jpg

  // 480x360
  // https://img.youtube.com/vi/VIDEO_ID/hqdefault.jpg

  // 640x480
  // https://img.youtube.com/vi/VIDEO_ID/sddefault.jpg

  // 1280x720/1280x720
  // https://img.youtube.com/vi/VIDEO_ID/maxresdefault.jpg
  const urlModel = [
    {
      width: 120,
      height: 90,
      url: "https://img.youtube.com/vi",
      fileNmae: "default.jpg",
    },
    {
      width: 320,
      height: 180,
      url: "https://img.youtube.com/vi",
      fileNmae: "mqdefault.jpg",
    },
    {
      width: 480,
      height: 360,
      url: "https://img.youtube.com/vi",
      fileNmae: "hqdefault.jpg",
    },
    {
      width: 640,
      height: 480,
      url: "https://img.youtube.com/vi",
      fileNmae: "default.jpg",
    },
    {
      width: 1280,
      height: 720,
      url: "https://img.youtube.com/vi",
      fileNmae: "maxresdefault.jpg",
    },
  ];
  const [url, setUrl] = useState("");
  const [thumbnails, setThumbnails] = useState([]);
  const handleSubmitt = (e) => {
    e.preventDefault();

    var vedio = getYouTubeID(url);
    console.log("video url", vedio);
    if (vedio) {
      const model = urlModel.map((item) => {
        return {
          ...item,
          url: `${item.url}/${vedio}/${item.fileNmae}`,
        };
      });
      console.log("models", model);
      setThumbnails(model);
    } else {
      toast.error("invalid youtube video url ");
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gray-400 py-8">
        <div className="text-center w-full">
          <h1 className="text-4xl font-bold">Youtube thumbnial downloader</h1>
          <form className="space-x-4 mt-8" onSubmit={handleSubmitt}>
            <input
              type="url"
              className="bg-white p-3 rounded-lg  w-[450px]"
              required
              placeholder="Enter youtube video url"
              onChange={(e) => setUrl(e.target.value)}
              value={url}
            />
            <button className="p-3 rounded-lg bg-indigo-600 text-white font-medium">
              Download
            </button>
          </form>
        </div>
        <div className="grid grid-cols-3 gap-12 w-10/12 mx-auto mt-12">
          {thumbnails.map((item, index) => {
            return (
              <div className="bg-white rounded-lg " key={index}>
                <img src={item.url} className="w-full h-[250px] object-cover" />
                <p>
                  {item.width}xp{item.height}
                </p>
                <a
                  className="download-button w-full text-white font-semibold py-2 rounded-lg flex items-center justify-center space-x-1 transition duration-150 ease-in-out bg-emerald-500 hover:bg-emerald-600"
                  href={item.url}
                  target="_blank"
                >
                  <span role="img" aria-label="download">
                    ⭐
                  </span>
                  <span>Download</span>
                </a>
              </div>
            );
          })}
        </div>
        <ToastContainer></ToastContainer>
      </div>
    </>
  );
}

export default App;
