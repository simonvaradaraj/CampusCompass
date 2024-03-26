import classnames from 'classnames';
import PropTypes from 'prop-types';
import { usePagination } from '../hooks/usePagination.js';

const Pagination = props => {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
    className,
  } = props;

  const paginationRange = usePagination({
    totalCount,
    pageSize,
    siblingCount,
    currentPage
  });

  const DOTS = "..."

  // If there are less than 2 pages in pagination range we shall not render the component
  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  let lastPage = paginationRange[paginationRange.length - 1];
  return (
    <ul
      className={classnames('pagination-container', { [className]: className }) + " flex flex-row justify-center mt-6 mb-3 gap-8"}
    >
       {/* Left navigation arrow */}
      <li
        className={classnames('pagination-item', {
          disabled: currentPage === 1
        })}
        onClick={onPrevious}
      >
        <div className="arrow left" />
      </li>
      {paginationRange.map((pageNumber, index) => {
         
        // If the pageItem is a DOT, render the DOTS unicode character
        if (pageNumber === DOTS) {
          return <li key={index} className="pagination-item dots text-lg">. . .</li>;
        }
		
        // Render our Page Pills
        return (
          <li
            key={`page-${pageNumber}`}
            className={classnames('pagination-item', {
              selected: pageNumber === currentPage
            }) + " p-1 pl-2 pr-2 bg-gray-300 hover:cursor-pointer hover:bg-gray-200 border-[1px] border-gray-400"}
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber}
          </li>
        );
      })}
      {/*  Right Navigation arrow */}
      <li 
        className={classnames('pagination-item', {
          disabled: currentPage === lastPage
        })}
        onClick={onNext}
      >
        <div className="arrow right" />
      </li>
    </ul>
  );
};

export default Pagination;

Pagination.propTypes = {
    onPageChange: PropTypes.func.isRequired,
    totalCount: PropTypes.number.isRequired, // Corrected to PropTypes.number
    siblingCount: PropTypes.number, // Corrected to PropTypes.number
    currentPage: PropTypes.number.isRequired, // Corrected to PropTypes.number
    pageSize: PropTypes.number.isRequired, // Corrected to PropTypes.number
    className: PropTypes.string, // Removed the "isRequired" since it's optional
};
