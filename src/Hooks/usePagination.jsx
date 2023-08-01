import { useState, useEffect } from "react";

const usePagination = (offset, totalItems, pageSize = 10, visiblePages = 5) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(totalItems / pageSize);

  useEffect(() => {
    setCurrentPage(1); // Reset the current page when offset, totalItems, or pageSize change
  }, [offset, totalItems, pageSize]);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const firstPage = () => {
    if (currentPage > 1) {
      setCurrentPage(1);
    }
  };

  const lastPage = () => {
    if (currentPage !== totalPages) {
      setCurrentPage(totalPages);
    }
  };

  // Calculate the range of visible pages based on the current page
  const getPageRange = () => {
    const halfVisiblePages = Math.floor(visiblePages / 2);
    const startPage = Math.max(currentPage - halfVisiblePages, 1);
    const endPage = Math.min(startPage + visiblePages - 1, totalPages);
    return { startPage, endPage };
  };

  // Generate an array of page numbers for the pagination control
  const getPaginationArray = () => {
    const { startPage, endPage } = getPageRange();
    const pages = [];
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  };

  // Calculate the current offset based on the current page and page size
  const currentOffset = (currentPage - 1) * pageSize;

  return {
    currentPage,
    pageSize,
    totalPages,
    currentOffset,
    handleNextPage,
    handlePrevPage,
    goToPage,
    getPaginationArray,
    lastPage,
    firstPage,
  };
};

export default usePagination;
