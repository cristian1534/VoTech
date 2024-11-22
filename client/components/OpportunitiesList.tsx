import React from "react";
import { Pricing } from "./Pricing";

export const OpportunitiesList = () => {
  const headline = "Become Part of Our Developer Community";
  const subheading =
    "Discover opportunities to collaborate on impactful projects and grow your skills.";
  const opportunities = [
    "Exclusive access to real projects.",
    "Networking opportunities with other professionals.",
    "A chance to learn and grow through collaboration.",
  ];

  return (
    <div className="flex flex-col items-center justify-center p-6 w-full font-sans shadow-lg">
      <h1 className="text-3xl font-bold text-center mb-4 bg-gradient-to-r from-orange-400 to-yellow-500 bg-clip-text text-transparent">{headline}</h1>
      <h2 className="text-xl text-center text-gray-400 mb-6">{subheading}</h2>
      <ul className="list-disc list-inside space-y-2">
        {opportunities.map((opportunity, index) => (
          <li key={index} className="text-lg text-gray-400">
            {opportunity}
          </li>
        ))}
      </ul>
      <div>
        <Pricing />
      </div>
    </div>
  );
};

