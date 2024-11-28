"use client";

import React, { useState } from "react";
import { BiSolidHeart } from "react-icons/bi";
import Image from "next/image";
import Link from "next/link";
import { Modal } from "./Modal";
import { useModal } from "../customHooks/useModal";

interface Card {
  id: number;
  uuid: string;
  name: string;
  description: string;
  image: string;
}

interface CardsGridProps {
  cards: Card[];
}

const CardsGrid: React.FC<CardsGridProps> = ({ cards }) => {
  const [selectedCardId, setSelectedCardId] = useState<number | null>(null);
  const { isOpen, openModal, closeModal } = useModal();

  return (
    <div className="mb-20 font-sans">
      <div className="container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 p-6 mx-auto shadow-2xl">
        {cards.length === 0 ? (
          <div className="text-center text-gray-400">NO PROJECTS FOUND.</div>
        ) : (
          cards.map((card) => (
            <div
              key={card.uuid}
              className="flex flex-col max-w-xs p-6 bg-white border border-gray-200 rounded-xl shadow-2xl transition-all duration-300 hover:shadow-xl hover:scale-105 mx-auto"
            >
              <a href="#">
                <div className="relative w-full h-48 rounded-t-lg overflow-hidden shadow-lg my-2">
                  <Image
                    src={card.image.trimEnd()}
                    alt={card.name}
                    className="object-cover"
                    layout="fill"
                    quality={100}
                    loading="lazy"
                  />
                </div>
                <h5 className="mb-2 text-xl text-center font-bold text-gray-400">
                  {card.name}
                </h5>
              </a>
              <p className="mb-3 text-gray-400 flex-grow">{card.description}</p>
              <div className="mt-auto flex justify-between items-center gap-4">
                <Link
                  href={`/projects/${card.uuid}`}
                  className="mt-4 text-white px-6 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-orange-500 hover:to-yellow-400 transition-colors rounded-lg font-medium shadow-lg shadow-orange-300"
                >
                  Details
                </Link>
                <button
                  onClick={() => {
                    setSelectedCardId(card.id);
                    openModal();
                  }}
                  className="mt-4 text-white px-6 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-orange-500 hover:to-yellow-400 transition-colors rounded-lg font-medium shadow-lg shadow-orange-300"
                >
                  Apply
                </button>
                <button className="text-red-500 hover:text-red-700">
                  <BiSolidHeart size={24} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
      <Modal isOpen={isOpen} closeModal={closeModal} id={selectedCardId} />
    </div>
  );
};

export default CardsGrid;
