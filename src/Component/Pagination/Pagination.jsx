import React from 'react'

function Pagination({ page, setPage, totalUsers, Limit }) {
    const totalPages = Math.ceil(totalUsers / Limit);

    const handleNextPage = () => {
        if (page < totalPages - 1) {
            setPage(page + 1);
        }
    };

    const handlePrevPage = () => {
        if (page > 0) {
            setPage(page - 1);
        }
    };

    return (
        <>
            <div className="text-white d-flex justify-content-end mt-5 pt-3">
                <button
                    onClick={handlePrevPage}
                    className="btn border-0 bg-transparent"
                    disabled={page === 0}
                >
                    <i className="fa-solid fa-chevron-left text-white"></i>
                </button>
                <span className="my-1">
                    {page + 1} / {totalPages}
                </span>
                <button
                    onClick={handleNextPage}
                    className="btn border-0 bg-transparent"
                    disabled={page === totalPages - 1}
                >
                    <i className="fa-solid fa-chevron-right text-white"></i>
                </button>
            </div>
        </>
    )
}

export default Pagination;
