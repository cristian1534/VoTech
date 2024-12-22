import { useState, useEffect } from 'react';

interface UsePaginationProps {
  totalRecords: number;
  pageLimit: number;
  pageNeighbours?: number;
}

export const usePagination = ({
  totalRecords,
  pageLimit,
  pageNeighbours = 2
}: UsePaginationProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [offset, setOffset] = useState(0);

  const totalPages = Math.ceil(totalRecords / pageLimit);

  const getPageNeighbours = (page: number) => {
    const start = Math.max(page - pageNeighbours, 1); 
    const end = Math.min(page + pageNeighbours, totalPages); 
    return Array.from({ length: end - start + 1 }, (_, index) => start + index);
  };

  const changePage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  useEffect(() => {
    setOffset((currentPage - 1) * pageLimit);
  }, [currentPage, pageLimit]);

  return {
    currentPage,
    offset,
    totalPages,
    getPageNeighbours, 
    changePage,
    setCurrentPage,
    setOffset
  };
};
