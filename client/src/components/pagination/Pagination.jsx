import PropTypes from "prop-types";

export default function Pagination({ currentPage, setCurrentPage, isLastPage }) {
    return (
        <div className="mt-35 flex justify-center items-center gap-4 mt-8">
            <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
                className="w-24 h-10 flex justify-center items-center bg-blue-500 text-white rounded-3xl hover:bg-blue-600 transition disabled:opacity-50"
            >
                Previous
            </button>

            <span className="px-6 py-2 bg-blue-500 text-white rounded-3xl">
                {currentPage}
            </span>

            <button
                disabled={isLastPage}
                onClick={() => setCurrentPage(currentPage + 1)}
                className="w-24 h-10 flex justify-center items-center bg-blue-500 text-white rounded-3xl hover:bg-blue-600 transition disabled:opacity-50"
            >
                Next
            </button>
        </div>
    );
}

Pagination.propTypes = {
    currentPage:  PropTypes.number.isRequired,
    setCurrentPage: PropTypes.func.isRequired,
    isLastPage:  PropTypes.number.isRequired,
}