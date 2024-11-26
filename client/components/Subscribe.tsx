import React from "react";

export function Subscribe() {
  return (
    <div className="-mt-24 shadow-md rounded-lg overflow-hidden font-sans">
      <div className="items-center justify-between py-10 px-5 bg-white shadow-2xl rounded-lg mx-auto text-center">
        <div className="px-2 -mt-6">
          <div className="text-center">
            <h2 className="text-center my-5 text-4xl md:text-5xl lg:text-6xl font-extrabold bg-gradient-to-r from-orange-400 to-yellow-500 bg-clip-text text-transparent">
              Newsletter
            </h2>
            <div className="w-full text-center">
              <form action="#">
                <div className="max-w-sm mx-auto p-1 pr-0 flex items-center">
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="@email..."
                    required
                    className="w-full px-4 py-2 border-b-2 border-gray-300 focus:ring-0 focus:outline-none focus:border-yellow-400"
                  />
                </div>
                <button
                  type="submit"
                  className="text-white px-6 py-3 my-2 bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-orange-500 hover:to-yellow-400 transition-colors rounded-lg font-medium shadow-lg shadow-orange-300"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
