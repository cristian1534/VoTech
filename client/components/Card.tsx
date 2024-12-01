"use client";

import React, { useState } from "react";
import { BiSolidHeart } from "react-icons/bi";
import Image from "next/image";
import Link from "next/link";
import { Modal } from "./Modal";
import { useModal } from "../customHooks/useModal";
import { BiSolidLeftArrow } from "react-icons/bi";
import { BiSolidRightArrow } from "react-icons/bi";
import { motion } from "framer-motion";
import { fadeIn } from "../helpers/variants";

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
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;
  const totalPages = Math.ceil(cards.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentCards = cards.slice(startIndex, startIndex + itemsPerPage);

  const { isOpen, openModal, closeModal } = useModal();
  const [selectedCardId, setSelectedCardId] = useState<number | null>(null);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="mb-20 font-sans">
      <div className="container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 p-6 mx-auto shadow-2xl">
        {currentCards.length === 0 ? (
          <div className="flex justify-center bg-orange-400 rounded-md ml-auto container">
            <p className="text-center text-white p-2 w-full">NO PROJECTS TO SHOW...</p>
          </div>
        ) : (
          currentCards.map((card) => (
            <motion.div
            key={card.uuid}
            variants={fadeIn({ direction: "down", delay: 0.3 })}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: false, amount: 0.3 }}
            whileHover={{
              scale: 1.05,
              boxShadow: "0 10px 20px rgba(0, 0, 0, 0.45)",  
              transition: { type: "spring", stiffness: 300, damping: 20 }
            }}
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
            </motion.div>
          ))
        )}
      </div>

      {cards.length > itemsPerPage && (
        <div className="flex justify-center items-center gap-4 mt-4">
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-orange-400 text-white rounded-lg hover:bg-orange-400 disabled:opacity-50"
          >
           <BiSolidLeftArrow/>
          </button>
          <span className="text-gray-500">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-orange-400 text-white rounded-lg hover:bg-orange-400 disabled:opacity-50"
          >
            <BiSolidRightArrow/>
          </button>
        </div>
      )}

      <Modal isOpen={isOpen} closeModal={closeModal} id={selectedCardId} />
    </div>
  );
};

export default CardsGrid;
