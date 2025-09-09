import { useBookContext } from "../context/BookContext";
import BounceLoader from "./BounceLoader";

function SearchResults() {
  const { searchResults, loading, error } = useBookContext();

  if (loading) return <BounceLoader />;
  if (error) return <p className="text-red-500">{error}</p>;
  if (searchResults.length === 0) return null;

  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {searchResults.map((book, idx) => {
        const coverUrl = book.cover_i
          ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
          : "https://via.placeholder.com/100x150?text=No+Cover";

        return (
          <li
            key={idx}
            className="flex gap-3 bg-white p-3 rounded-lg shadow hover:shadow-md transition"
          >
            <img
              src={coverUrl}
              alt={book.title}
              className="w-16 h-24 object-cover rounded-md border"
            />
            <div>
              <p className="font-medium text-gray-800">{book.title}</p>
              {book.author_name && (
                <p className="text-sm text-gray-500">
                  {book.author_name.join(", ")}
                </p>
              )}
              {book.first_publish_year && (
                <p className="text-xs text-gray-400">
                  First Published: {book.first_publish_year}
                </p>
              )}
            </div>
          </li>
        );
      })}
    </ul>
  );
}

export default SearchResults;
