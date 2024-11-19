import React from "react";
import Image from "next/image";

interface Card {
  id: number;
  image: string;
  title: string;
  description: string;
}

interface GridProps {
  cards: Card[];
}

export default function Card({ cards }: GridProps) {
  return (
    <div className="container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 p-6 mx-auto">
      {cards.map((card) => (
        <div
          key={card.id}
          className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
        >
          <a href="#">
            <Image
              src={card.image}
              alt={card.title}
              className="w-full h-48 object-cover rounded-lg"
              width={200}
              height={200}
            />
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {card.title}
            </h5>
          </a>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            {card.description}
          </p>
          <button
            className="mt-4 text-white px-6 py-4 bg-gradient-to-r 
bg-gradient- from-yellow-400 to-orange-500
 hover:from-orange-500 hover:to-yellow-400 transition-colors rounded-lg font-medium shadow-lg shadow-orange-300"
          >
            Join Now
          </button>
        </div>
      ))}
    </div>
  );
}
