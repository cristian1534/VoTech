import React from "react";

export function Subscribe() {
  return (
    <div className="container flex flex-col justify-center items-center mx-auto mb-8 py-10 text-gray-400 font-sans">
      <div className="bg-white max-w-2xl h-64 w-full rounded-lg shadow-md bg-cover bg-center">
        <h2 className="text-center my-7 text-4xl md:text-5xl lg:text-6xl font-extrabold bg-gradient-to-r from-orange-400 to-yellow-500 bg-clip-text text-transparent">
          Newsletter VoTech
        </h2>
      </div>

      <div className="-mt-24 shadow-md rounded-lg overflow-hidden">
        <div className="items-center justify-between py-10 px-5 bg-white shadow-2xl rounded-lg mx-auto text-center">
          <div className="px-2 -mt-6">
            <div className="text-center">
              <h1 className="text-3xl text-orange-300 leading-loose my-3 w-full">
                Get the Latest Information
              </h1>
              <div className="w-full text-center">
                <form action="#">
                  <div className="max-w-sm mx-auto p-1 pr-0 flex items-center">
                    <input
                      type="email"
                      placeholder="@Email..."
                      className="flex-1 appearance-none rounded shadow p-3 text-gray-400 focus:outline-none mr-2"
                    />
                    <button
                      type="submit"
                      className="text-white px-6 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-orange-500 hover:to-yellow-400 transition-colors rounded-lg font-medium shadow-lg shadow-orange-300"
                    >
                      Subscribe
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
