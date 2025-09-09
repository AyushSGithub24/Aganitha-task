import { useBookContext } from "../context/BookContext";

function Suggestions() {
  const { suggestions, setSearchTerm, setShowSuggestions, showSuggestions } =
    useBookContext();

  if (!showSuggestions || suggestions.length === 0) return null;

  return (
    <div className="absolute top-12 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-80 overflow-y-auto z-10">
      {suggestions.slice(0, 10).map((book, idx) => {
        const coverUrl = book.cover_i
          ? `https://covers.openlibrary.org/b/id/${book.cover_i}-S.jpg`
          : "https://via.placeholder.com/50x75?text=No+Cover";

        return (
          <div
            key={idx}
            className="flex items-center gap-3 p-2 hover:bg-gray-100 cursor-pointer transition"
            onClick={() => {
              setSearchTerm(book.title);
              setShowSuggestions(false); // hide dropdown on select
            }}
          >
            <img
              src={coverUrl}
              alt={book.title}
              className="w-8 h-12 object-cover rounded-md border"
            />
            <div>
              <p className="font-medium text-gray-800">{book.title}</p>
              {book.author_name && (
                <p className="text-sm text-gray-500">
                  {book.author_name.join(", ")}
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Suggestions;
