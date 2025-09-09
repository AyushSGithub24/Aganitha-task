import { useBookContext } from "../context/BookContext";

function Pagination() {
  const { page, numFound, handlePageChange, limit } = useBookContext();

  if (numFound === 0) return null;

  const totalPages = Math.ceil(numFound / limit);

  return (
    <div className="flex justify-center gap-4 mt-6">
      <button
        onClick={() => handlePageChange(Math.max(page - 1, 1))}
        disabled={page === 1}
        className="px-4 py-2 border rounded disabled:opacity-50"
      >
        Prev
      </button>
      <span className="self-center">
        Page {page} of {totalPages}
      </span>
      <button
        onClick={() =>
          handlePageChange(page * limit < numFound ? page + 1 : page)
        }
        disabled={page * limit >= numFound}
        className="px-4 py-2 border rounded disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;
