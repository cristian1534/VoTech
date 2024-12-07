"use client";

import React, { useState, useEffect } from "react";
import {
  BiSolidHeart,
  BiSolidLeftArrow,
  BiSolidRightArrow,
} from "react-icons/bi";
import Image from "next/image";
import Link from "next/link";
import { Modal } from "./Modal";
import { useModal } from "../customHooks/useModal";
import { motion } from "framer-motion";
import { fadeIn } from "../helpers/variants";
import { getUsers, updateVotes } from "../lib/api";
import { useSession } from "../context/SessionContext";

interface Card {
  id: number;
  uuid: string;
  name: string;
  description: string;
  image: string;
  votes: number;
}

interface CardsGridProps {
  cards: Card[];
}

const CardsGrid: React.FC<CardsGridProps> = ({ cards }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [stateOfPayment, setStateOfPayment] = useState<boolean | null>(null);
  const { sessionEmail } = useSession();

  const itemsPerPage = 3;
  const totalPages = Math.ceil(cards.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentCards = cards.slice(startIndex, startIndex + itemsPerPage);

  const { isOpen, openModal, closeModal } = useModal();
  const [selectedCardId, setSelectedCardId] = useState<number | null>(null);
  const paymentWarning = () => {
    return (
      <div
        className="bg-red-400 border-t border-b border-orange-200 text-center text-white px-4 py-3 my-3 shadow-2xl font-sans rounded-md"
        role="alert"
      >
        <p className="font-bold text-lg">Subscription Expired</p>
        <p className="text-md">Please update your Payment.</p>
      </div>
    );
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const users = await getUsers();
        if (users) {
          const currentPayment = users.find(
            (user) => user.email === sessionEmail
          )?.active;
          setStateOfPayment(currentPayment ?? null);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, [cards, stateOfPayment, sessionEmail]);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500">Loading cards, please wait...</p>
      </div>
    );
  }

  return (
    <div className="mb-20 font-sans">
      <div>{!stateOfPayment && sessionEmail && paymentWarning()}</div>
      <div className="container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 p-6 mx-auto shadow-2xl">
        {!currentCards.length ? (
          <div className="flex justify-center bg-orange-400 rounded-md ml-auto container">
            <p className="text-center text-white p-2 w-full">
              NO PROJECTS TO SHOW...
            </p>
          </div>
        ) : (
          currentCards.map((card) => {
            const maxVotes = 30;
            const percentage = (card.votes / maxVotes) * 100;

            return (
              <motion.div
                key={card.uuid}
                variants={fadeIn({ direction: "down", delay: 0.3 })}
                initial="hidden"
                whileInView={"show"}
                viewport={{ once: false, amount: 0.3 }}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 10px 20px rgba(0, 0, 0, 0.45)",
                  transition: { type: "spring", stiffness: 300, damping: 20 },
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
                  <h5 className="mb-2 text-xl text-center font-bold text-orange-400">
                    {card.name}
                  </h5>
                </a>
                <p className="mb-3 text-gray-400 flex-grow line-clamp-2">
                  {card.description}
                </p>
                <span className="text-orange-300 text-end">...view more</span>
                <div className="flex items-center">
                  <span className="mr-2 text-orange-300">%</span>
                  <div className="w-full bg-gray-200 rounded-full h-4">
                    <div
                      className="bg-orange-300 h-4 rounded-full"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>

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
                    className={`mt-4 text-white px-6 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-orange-500 hover:to-yellow-400 transition-colors rounded-lg font-medium shadow-lg shadow-orange-300
                      ${
                        stateOfPayment === false
                          ? "cursor-not-allowed opacity-50"
                          : ""
                      }`}
                    disabled={stateOfPayment === false}
                  >
                    Apply
                  </button>

                  <div className="flex flex-col items-center justify-center gap-x-2 m-auto mt-3">
                    <span className="font-sans font-bold text-orange-300">
                      {card.votes}
                    </span>

                    <button
                      className="text-red-500 hover:text-red-700 flex items-center"
                      onClick={async () => {
                        await updateVotes(card.uuid, card.votes + 1);
                      }}
                    >
                      <BiSolidHeart size={24} />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })
        )}
      </div>

      {cards.length > itemsPerPage && (
        <div className="flex justify-center items-center gap-4 mt-4">
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-orange-400 text-white rounded-lg hover:bg-orange-400 disabled:opacity-50"
          >
            <BiSolidLeftArrow />
          </button>
          <span className="text-gray-500">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-orange-400 text-white rounded-lg hover:bg-orange-400 disabled:opacity-50"
          >
            <BiSolidRightArrow />
          </button>
        </div>
      )}

      <Modal isOpen={isOpen} closeModal={closeModal} id={selectedCardId} />
    </div>
  );
};

export default CardsGrid;
