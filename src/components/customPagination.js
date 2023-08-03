import React from "react";
import { Pagination } from "react-bootstrap";

const CustomPagination = ({
  itemsPerPage,
  totalItems,
  currentPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    onPageChange(pageNumber);
  };

  return (
    <Pagination style={{ justifyContent: "end", paddingRight: "50px" }}>
      <Pagination.First
        onClick={() => handlePageChange(1)}
        disabled={currentPage === 1}
      />
      <Pagination.Prev
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      />

      {[...Array(totalPages).keys()].map((pageNumber) => (
        <Pagination.Item
          key={pageNumber + 1}
          active={pageNumber + 1 === currentPage}
          onClick={() => handlePageChange(pageNumber + 1)}
        >
          {pageNumber + 1}
        </Pagination.Item>
      ))}

      <Pagination.Next
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      />
      <Pagination.Last
        onClick={() => handlePageChange(totalPages)}
        disabled={currentPage === totalPages}
      />
    </Pagination>
  );
};

export default CustomPagination;
