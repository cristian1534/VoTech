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
import { getUsers, updateVotes, getProjects } from "../lib/api";
import { useSession } from "../context/SessionContext";
import { BiChat } from "react-icons/bi";
import { usePagination } from "../customHooks/usePagination";

interface Card {
  id: number;
  uuid: string;
  name: string;
  description: string;
  image: string;
  votes: number;
}


const CardsGrid = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [stateOfPayment, setStateOfPayment] = useState<boolean | null>(null);
  const { sessionEmail } = useSession();
  const itemsPerPage = 2;


  const { currentPage, totalPages, changePage, getPageNeighbours } =
    usePagination({
      totalRecords: cards.length,
      pageLimit: itemsPerPage,
    });

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentCards = cards.sort((a, b) => b.votes - a.votes).slice(startIndex, startIndex + itemsPerPage);
 

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
      console.log("Card", card)
    } catch (error) {
      console.error("Error updating votes:", error);
    }
  };


  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await getProjects();
        const projects = response.props.projects;
        setCards(projects || []);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setIsLoading(false);
      }
    }
    
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
    fetchCards();
    fetchUsers();
  }, [sessionEmail]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500">Loading cards, please wait...</p>
      </div>
    );
  }

  return (
    <div className="py-16 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 font-sans">
      <div className="container mx-auto px-4 flex flex-col lg:flex-row gap-8">
        <motion.div
          className="lg:w-1/4 bg-gray-800/50 backdrop-blur-sm flex flex-col items-center justify-center p-8 text-gray-300 border border-gray-700/50 rounded-xl shadow-xl"
          variants={fadeIn({ direction: "right", delay: 0.3 })}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: false, amount: 0.3 }}
          whileHover={{
            scale: 1.02,
            boxShadow: "0 20px 40px rgba(0, 0, 0, 0.4)",
          }}
        >
          <div className="text-orange-400 mb-4">
            <BiChat size={60} />
          </div>
          <h3 className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent mb-4">Public Chat</h3>
          <p className="mt-2 text-center mb-6">
            Join our public chat! Find devs online to share any ideas or ask
            questions to help each other at any time.
          </p>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              href="https://votech.onrender.com/"
              target="blank"
              className="px-6 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-lg hover:from-orange-500 hover:to-yellow-400 transition-all shadow-lg shadow-orange-500/20"
            >
              Go to Chat
            </Link>
          </motion.div>
        </motion.div>

        <div className="lg:w-3/4 flex flex-col items-center justify-center gap-6">
          {!stateOfPayment && sessionEmail && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-500/10 border border-red-500/50 text-center px-6 py-4 rounded-xl w-full"
            >
              <p className="font-bold text-xl text-red-400">Subscription Expired</p>
              <p className="text-gray-300">Please update your Payment.</p>
            </motion.div>
          )}

          {!currentCards.length ? (
            <motion.div 
              className="flex justify-center bg-orange-500/20 border border-orange-500/50 rounded-xl w-full p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <p className="text-center text-orange-400">
                NO PROJECTS TO SHOW...
              </p>
            </motion.div>
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
                    boxShadow: "0 20px 40px rgba(0, 0, 0, 0.4)",
                  }}
                  className="flex flex-col md:flex-row items-center gap-6 p-8 bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl shadow-xl w-full"
                >
                  <div className="flex flex-col w-full md:w-2/3">
                    <h5 className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent mb-4">
                      {card.name}
                    </h5>
                    <p className="text-gray-300 mb-6 line-clamp-3">
                      {card.description}
                    </p>
                    <div className="flex items-center mb-6">
                      <span className="mr-3 text-orange-400">Progress:</span>
                      <div className="w-full bg-gray-700 rounded-full h-4">
                        <div
                          className="bg-gradient-to-r from-yellow-400 to-orange-500 h-4 rounded-full transition-all duration-500"
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Link
                          href={`/projects/${card.uuid}`}
                          className="px-6 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-lg hover:from-orange-500 hover:to-yellow-400 transition-all shadow-lg shadow-orange-500/20"
                        >
                          Details
                        </Link>
                      </motion.div>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          setSelectedCardId(card.id);
                          openModal();
                        }}
                        className={`px-6 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-lg hover:from-orange-500 hover:to-yellow-400 transition-all shadow-lg shadow-orange-500/20 ${
                          stateOfPayment === false
                            ? "opacity-50 cursor-not-allowed"
                            : ""
                        }`}
                        disabled={stateOfPayment === false}
                      >
                        Apply
                      </motion.button>
                      <div className="flex flex-col items-center">
                        <span className="font-bold text-orange-400 text-lg">
                          {card.votes}
                        </span>
                        <motion.button
                          whileHover={{ scale: 1.2 }}
                          whileTap={{ scale: 0.9 }}
                          className="text-red-500 hover:text-red-400 transition-colors"
                          onClick={() => handleVoteUpdate(card.uuid)}
                        >
                          <BiSolidHeart size={28} />
                        </motion.button>
                      </div>
                    </div>
                  </div>
                  <div className="relative w-full md:w-1/3 h-64 rounded-xl overflow-hidden">
                    <Image
                      src={card.image.trimEnd()}
                      alt={card.name}
                      className="object-cover"
                      fill
                    />
                  </div>
                </motion.div>
              );
            })
          )}

          <div className="flex justify-center mt-8 space-x-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => changePage(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-3 text-orange-400 hover:text-orange-300 disabled:opacity-50"
            >
              <BiSolidLeftArrow />
            </motion.button>
            {getPageNeighbours(currentPage).map((page) => (
              <motion.button
                key={page}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => changePage(page)}
                className={`p-3 rounded-lg ${
                  page === currentPage
                    ? "bg-gradient-to-r from-yellow-400 to-orange-500 text-white"
                    : "text-gray-400 hover:text-orange-400"
                }`}
              >
                {page}
              </motion.button>
            ))}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => changePage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-3 text-orange-400 hover:text-orange-300 disabled:opacity-50"
            >
              <BiSolidRightArrow />
            </motion.button>
          </div>
        </div>
        <Modal closeModal={closeModal} isOpen={isOpen} id={selectedCardId} />
      </div>
    </div>
  );
};

export default CardsGrid;
