/* eslint-disable react/prop-types */
import { memo, useState, useEffect } from "react";
import { useSelector } from "react-redux";

function PaginationEL({ handler, handlePreviousNext }) {
  const {
    notificationFilter: { pageNo },
  } = useSelector((store) => store.notifications);

  const [pageRange, setPageRange] = useState([1, 2, 3, 4, 5]);

  useEffect(() => {
    if (pageNo > pageRange[pageRange.length - 1]) {
      setPageRange(pageRange.map((page) => page + 1));
    } else if (pageNo < pageRange[0]) {
      setPageRange(pageRange.map((page) => page - 1));
    }
  }, [pageNo, pageRange]);

  return (
    <nav aria-label="Page navigation example">
      <ul className="inline-flex -space-x-px text-sm">
        {pageNo > 1 && (
          <li onClick={() => handlePreviousNext("prev")}>
            <a className="cursor-pointer flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
              Previous
            </a>
          </li>
        )}
        {pageRange.map((page, i) => (
          <li onClick={() => handler(page)} key={i}>
            <a
              className={`cursor-pointer flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${
                pageNo === page ? "bg-blue-100" : ""
              }`}
            >
              {page}
            </a>
          </li>
        ))}

        <li onClick={() => handlePreviousNext("next")}>
          <a className="cursor-pointer flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
            Next
          </a>
        </li>
      </ul>
    </nav>
  );
}

const Pagination = memo(PaginationEL);
export default Pagination;
