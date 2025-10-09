import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import "remixicon/fonts/remixicon.css";

const API_KEY = "CkXrWNmLSrO6jk7RE5N57sJcSEVkxESJjkTDBNL6Lg3JDXcEjaZ";
function App() {
  const [query, setQuery] = useState("nature");
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(1);
  const fetchImage = async () => {
    try {
      const options = {
        headers: {
          Authorization: API_KEY,
        },
      };
      const res = await axios.get(
        `https://api.pexels.com/v1/search?query=${query}&page=1&per_page=12`,
        options
      );

      setPhotos([...photos, ...res.data.photos]);
    } catch (err) {
      toast.error("faild fetch image");
    }
  };
  const download = (url) => {
    const a = document.createComment("a");
    a.href = url;
    a.download = `${Date.now()}.jpeg`;
    a.click();
    a.remove();
  };
  const loadMore = () => {
    setPage(page + 1);
  };
  const searchData = (e) => {
    e.preventDefault();
    const queryData = e.target[0].value.trim();
    setPhotos([]);
    setQuery(queryData);
  };
  useEffect(() => {
    fetchImage();
  }, [page, query]);
  return (
    <>
      <div className="container mx-auto p-4 md:p-8">
        <header className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-semibold text-indigo-700 flex items-center justify-center space-x-2">
            <span role="img" aria-label="camera">
              📷
            </span>
            <span>Image Gallery - {page > 0 ? page : "-"}</span>
          </h1>
        </header>
        <hr className="mb-8 border-indigo-200" />
        <div className="flex justify-center mb-12">
          <form
            onSubmit={searchData}
            className="w-full max-w-xl flex shadow-lg rounded-lg overflow-hidden"
          >
            <input
              type="text"
              placeholder="Search image here"
              className="flex-grow p-3 text-gray-700 border-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button className="search-button text-white px-6 py-3 font-medium transition duration-150 ease-in-out">
              Search
            </button>
          </form>
        </div>
        <main className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {
            // Render 15 placeholder cards using Array(15).fill().map()
            photos.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition duration-300 overflow-hidden"
              >
                <img
                  src={item.src.medium}
                  alt={item.alt}
                  className="w-full h-64 object-cover"
                />
                <div className="p-4 pt-3">
                  <p className="text-center font-medium text-gray-800 mb-3 truncate">
                    {item.photographer} {index + 1}
                  </p>
                  <a
                    className="download-button w-full text-white font-semibold py-2 rounded-lg flex items-center justify-center space-x-1 transition duration-150 ease-in-out bg-emerald-500 hover:bg-emerald-600"
                    href={item.src.orginal}
                    target="_blank"
                  >
                    <span role="img" aria-label="download">
                      ⭐
                    </span>
                    <span>Download</span>
                  </a>
                </div>
              </div>
            ))
          }
        </main>
        <div className="flex justify-center w-full my-8">
          <button
            className="w-[300px]
         text-white font-semibold py-2 rounded-lg flex items-center justify-center space-x-1 transition duration-150 ease-in-out bg-red-700"
            onClick={loadMore}
          >
            Load More
          </button>
        </div>
        <ToastContainer></ToastContainer>
      </div>
    </>
  );
}

export default App;
