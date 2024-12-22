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
import { BiChat } from "react-icons/bi";

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

const CardsGrid: React.FC<CardsGridProps> = ({ cards: initialCards }) => {
  const [cards, setCards] = useState<Card[]>(initialCards);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [stateOfPayment, setStateOfPayment] = useState<boolean | null>(null);
  const { sessionEmail } = useSession();
  const itemsPerPage = 2;
  const totalPages = Math.ceil(cards.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentCards = cards.slice(startIndex, startIndex + itemsPerPage);
  const { isOpen, openModal, closeModal } = useModal();
  const [selectedCardId, setSelectedCardId] = useState<number | null>(null);

  const paymentWarning = () => (
    <div
      className="bg-red-400 border-t border-b border-orange-200 text-center text-white px-4 py-3 my-3 shadow-2xl font-sans rounded-md"
      role="alert"
    >
      <p className="font-bold text-lg">Subscription Expired</p>
      <p className="text-md">Please update your Payment.</p>
    </div>
  );

  const handleVoteUpdate = async (uuid: string) => {
    try {
      const card = cards.find((card) => card.uuid === uuid);
      if (!card) return;
      const updatedVotes = card.votes + 1;
      await updateVotes(uuid, updatedVotes);
      const updatedCards = cards.map((card) =>
        card.uuid === uuid ? { ...card, votes: updatedVotes } : card
      );
      setCards(updatedCards);
    } catch (error) {
      console.error("Error updating votes:", error);
    }
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
    <div className="mb-20 font-sans flex flex-col lg:flex-row gap-8">
      <motion.div
        className="g:w-1/4 bg-white flex flex-col items-center justify-center p-4 text-gray-400  border border-gray-200 rounded-sm shadow-lg space-y-4"
        variants={fadeIn({ direction: "right", delay: 0.3 })}
        initial="hidden"
        whileInView={"show"}
        viewport={{ once: false, amount: 0.3 }}
        whileHover={{
          scale: 1.02,
          boxShadow: "0 5px 15px rgba(0, 0, 0, 0.3)",
        }}
      >
        <div className="text-orange-400">
          <BiChat size={50} />
        </div>
        <h3 className="text-orange-400 text-lg font-bold">Public Chat</h3>
        <p className="mt-2 text-center">
          Join our public chat! Find devs online to share any ideas or ask
          questions to help each other at any time.
        </p>
        <Link
          href="https://votech.onrender.com/"
          target="blank"
          className="px-4 py-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-lg hover:from-orange-500 hover:to-yellow-400 transition-all"
        >
          Go to Chat
        </Link>
      </motion.div>
      <div className="w-3/4 flex flex-col items-center justify-center mx-auto p-4 gap-6">
        {!stateOfPayment && sessionEmail && paymentWarning()}
        {!currentCards.length ? (
          <div className="flex justify-center bg-orange-400 rounded-md mx-auto w-full">
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
                variants={fadeIn({ direction: "right", delay: 0.3 })}
                initial="hidden"
                whileInView={"show"}
                viewport={{ once: false, amount: 0.3 }}
                whileHover={{
                  scale: 1.02,
                  boxShadow: "0 5px 15px rgba(0, 0, 0, 0.3)",
                }}
                className="flex flex-col md:flex-row items-center gap-4 p-4 bg-white border border-gray-200 rounded-sm shadow-lg transition-all duration-300 hover:shadow-xl md:w-full sm:w-1/3"
              >
                <div className="flex flex-col w-full md:w-2/3">
                  <h5 className="text-xl font-bold text-orange-400">
                    {card.name}
                  </h5>
                  <p className="text-gray-400 mt-2 line-clamp-3">
                    {card.description}
                  </p>
                  <div className="flex items-center mt-4">
                    <span className="mr-2 text-orange-300">Progress:</span>
                    <div className="w-full bg-gray-200 rounded-full h-4">
                      <div
                        className="bg-orange-300 h-4 rounded-full"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center gap-4">
                    <Link
                      href={`/projects/${card.uuid}`}
                      className="px-4 py-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-lg hover:from-orange-500 hover:to-yellow-400 transition-all"
                    >
                      Details
                    </Link>
                    <button
                      onClick={() => {
                        setSelectedCardId(card.id);
                        openModal();
                      }}
                      className={`px-4 py-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-lg hover:from-orange-500 hover:to-yellow-400 transition-all ${
                        stateOfPayment === false
                          ? "cursor-not-allowed opacity-50"
                          : ""
                      }`}
                      disabled={stateOfPayment === false}
                    >
                      Apply
                    </button>
                    <div className="flex flex-col items-center justify-start gap-x-2 md:mt-0">
                      <span className="font-sans font-bold text-orange-300">
                        {card.votes}
                      </span>
                      <button
                        className="text-red-500 hover:text-red-700 flex items-center"
                        onClick={() => handleVoteUpdate(card.uuid)}
                      >
                        <BiSolidHeart size={24} />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="relative w-full md:w-1/3 lg:w-2/3 xl:w-2/3 h-48 lg:h-64">
                  <Image
                    src={card.image.trimEnd()}
                    alt={card.name}
                    className="object-cover rounded-lg"
                    fill
                    quality={100}
                    loading="lazy"
                  />
                </div>
              </motion.div>
            );
          })
        )}
        {cards.length > itemsPerPage && (
          <div className="flex justify-center items-center gap-4 mt-4">
            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-orange-400 text-white rounded-md hover:bg-orange-500 disabled:opacity-50"
            >
              <BiSolidLeftArrow />
            </button>
            <span className="text-gray-400 font-sans">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-orange-400 text-white rounded-md hover:bg-orange-500 disabled:opacity-50"
            >
              <BiSolidRightArrow />
            </button>
          </div>
        )}
      </div>
      <Modal isOpen={isOpen} closeModal={closeModal} id={selectedCardId} />
    </div>
  );
};

export default CardsGrid;
