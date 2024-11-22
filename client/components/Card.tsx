import React, { useState } from 'react';
import { BiLeftArrow, BiRightArrow, BiSolidHeart } from 'react-icons/bi';
import Image from 'next/image';
import { useModal } from '../customHooks/useModal';
import { Modal } from './Modal';

interface Card {
  id: number;
  image: string;
  title: string;
  description: string;
}

interface GridProps {
  cards: Card[];
}

const CardsGrid: React.FC<GridProps> = ({ cards }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 3;

  const { isOpen, openModal, closeModal } = useModal(); 

  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = cards.slice(indexOfFirstCard, indexOfLastCard);

  const totalPages = Math.ceil(cards.length / cardsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="mb-20 font-sans">
      <div className="flex justify-center gap-4 my-8">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className="bg-gray-300 hover:bg-gray-400 text-gray-400 font-bold py-2 px-4 rounded-l"
        >
          <BiLeftArrow />
        </button>
        <span className="self-center text-lg text-orange-300">{`Page ${currentPage} of ${totalPages}`}</span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="bg-gray-300 hover:bg-gray-400 text-gray-400 font-bold py-2 px-4 rounded-r"
        >
          <BiRightArrow />
        </button>
      </div>
      <div className="container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 p-6 mx-auto">
        {currentCards.map((card) => (
          <div
            key={card.id}
            className="max-w-xs p-6 bg-white border border-gray-200 rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 mx-auto"
          >
            <a href="#">
              <Image
                src={card.image}
                alt={card.title}
                className="w-full h-32 object-cover rounded-lg my-4"
                width={200}
                height={200}
              />
              <h5 className="mb-2 text-xl text-center font-bold text-gray-400">{card.title}</h5>
            </a>
            <p className="mb-3 text-gray-400">{card.description}</p>
            <div className="flex justify-between items-center">
              <button className="mt-4 text-white px-6 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-orange-500 hover:to-yellow-400 transition-colors rounded-lg font-medium shadow-lg shadow-orange-300">
                Details
              </button>
              <button
                onClick={openModal} // Trigger the modal open
                className="mt-4 text-white px-6 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-orange-500 hover:to-yellow-400 transition-colors rounded-lg font-medium shadow-lg shadow-orange-300"
              >
                Apply
              </button>
              <button className="text-red-500 hover:text-red-700">
                <BiSolidHeart size={24} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <Modal isOpen={isOpen} closeModal={closeModal} />
    </div>
  );
};

export default CardsGrid;
