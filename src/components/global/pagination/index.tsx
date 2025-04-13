"use client"

type PaginationProps = {
    totalPages: number,
    currentPage: number,
    setCurrentPage: (page: number) => void,
    itemsPerPage: number,
    hasNextPage: boolean,
    hasPreviousPage: boolean,
}
const Pagination = ({ totalPages, currentPage, setCurrentPage, itemsPerPage, hasNextPage, hasPreviousPage }: PaginationProps) => {
    return (

        <div className='flex items-center justify-center mt-8'>
            <p className="mr-2">Items per page: {itemsPerPage}</p>
            <button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)} className="bg-slate-900 px-4 py-3 rounded-lg">Previous</button>
            <div className="flex items-center gap-2">
                {[...Array(totalPages).keys()].map((page, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentPage(page + 1)}
                        className={`${currentPage === page + 1 ? 'bg-white text-neutral-900' : 'bg-neutral-800 text-neutral-300'} px-4 py-2 rounded-lg`}
                    >
                        {page + 1}
                    </button>
                ))}
            </div>
            <button disabled={!hasNextPage} onClick={() => setCurrentPage(currentPage + 1)} className="bg-slate-900 px-4 py-3 rounded-lg">Next</button>
        </div>
    )
}

export default Pagination