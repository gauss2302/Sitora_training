'use client';

interface PaginationProps {
	currentPage: number;
	totalPages: number;
	onPageChange: (page: number) => void;
}

export default function Pagination({
									   currentPage,
									   totalPages,
									   onPageChange
								   }: PaginationProps) {
	// Generate page numbers to display
	const getPageNumbers = () => {
		const pageNumbers = [];
		const maxPagesToShow = 5;

		if (totalPages <= maxPagesToShow) {
			// Show all pages if there are fewer than maxPagesToShow
			for (let i = 1; i <= totalPages; i++) {
				pageNumbers.push(i);
			}
		} else {
			// Always show first page
			pageNumbers.push(1);

			// Calculate start and end of page range around current page
			let start = Math.max(2, currentPage - 1);
			let end = Math.min(totalPages - 1, currentPage + 1);

			// Adjust if at the edges
			if (currentPage <= 2) {
				end = 3;
			} else if (currentPage >= totalPages - 1) {
				start = totalPages - 2;
			}

			// Add ellipsis if needed
			if (start > 2) {
				pageNumbers.push('...');
			}

			// Add pages in the middle
			for (let i = start; i <= end; i++) {
				pageNumbers.push(i);
			}

			// Add ellipsis if needed
			if (end < totalPages - 1) {
				pageNumbers.push('...');
			}

			// Always show last page
			pageNumbers.push(totalPages);
		}

		return pageNumbers;
	};

	const pageNumbers = getPageNumbers();

	return (
		<nav aria-label="Pagination" className="flex justify-center mt-8">
			<ul className="flex items-center -space-x-px">
				{/* Previous button */}
				<li>
					<button
						onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
						disabled={currentPage === 1}
						className="px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
						aria-label="Previous page"
					>
						<span className="sr-only">Previous</span>
						<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
							<path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
						</svg>
					</button>
				</li>

				{/* Page numbers */}
				{pageNumbers.map((page, index) => (
					<li key={index}>
						{page === '...' ? (
							<span className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300">
                ...
              </span>
						) : (
							<button
								onClick={() => typeof page === 'number' && onPageChange(page)}
								className={`px-3 py-2 leading-tight border ${
									page === currentPage
										? 'text-blue-600 border-blue-300 bg-blue-50'
										: 'text-gray-500 bg-white border-gray-300 hover:bg-gray-100'
								}`}
								aria-current={page === currentPage ? 'page' : undefined}
							>
								{page}
							</button>
						)}
					</li>
				))}

				{/* Next button */}
				<li>
					<button
						onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
						disabled={currentPage === totalPages}
						className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
						aria-label="Next page"
					>
						<span className="sr-only">Next</span>
						<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
							<path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
						</svg>
					</button>
				</li>
			</ul>
		</nav>
	);
}
