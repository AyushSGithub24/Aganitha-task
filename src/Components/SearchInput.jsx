import { useBookContext } from "../context/BookContext";

function SearchInput() {
  const { searchTerm, setSearchTerm, handleSearch } = useBookContext();

  return (
    <div className="relative w-full max-w-md flex gap-2">
      <input
        type="text"
        placeholder="Enter book name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
      />
      <button
        onClick={handleSearch}
        className="px-4 py-2 bg-indigo-500 text-white rounded-lg shadow hover:bg-indigo-600 transition"
      >
        Search
      </button>
    </div>
  );
}

export default SearchInput;
