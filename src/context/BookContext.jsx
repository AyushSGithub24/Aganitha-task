import { createContext, useContext, useState, useEffect, useCallback, useRef } from "react";

const BookContext = createContext(null);

export const BookProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [numFound, setNumFound] = useState(0);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const limit = 10;
  const cacheRef = useRef(new Map()); // 🔹 cache storage

  // Fetch helper with cache
  const fetchBooks = useCallback(
    async (term, pageNum = 1, isSuggestion = false) => {
      if (!term) return;
      const cacheKey = `${term}-${pageNum}-${isSuggestion ? "sugg" : "res"}`;

      // ✅ Return from cache if available
      if (cacheRef.current.has(cacheKey)) {
        const cached = cacheRef.current.get(cacheKey);
        if (isSuggestion) {
          setSuggestions(cached.docs);
          setNumFound(cached.numFound);
        } else {
          setSearchResults(cached.docs);
          setNumFound(cached.numFound);
        }
        return;
      }

      try {
        setLoading(true);
        setError("");
        const url = `https://openlibrary.org/search.json?title=${encodeURIComponent(
          term
        )}&limit=${limit}&page=${pageNum}`;
        const res = await fetch(url);
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();

        const docs = data.docs || [];
        const total = data.numFound || 0;

        // ✅ Save in cache
        cacheRef.current.set(cacheKey, { docs, numFound: total });

        if (isSuggestion) {
          setSuggestions(docs);
          setNumFound(total);
        } else {
          setSearchResults(docs);
          setNumFound(total);
        }
      } catch (err) {
        setError("Something went wrong. Try again.");
      } finally {
        setLoading(false);
      }
    },
    [limit]
  );

  // 🔹 Debounce Suggestions
  useEffect(() => {
    if (!searchTerm) {
      setSuggestions([]);
      return;
    }

    const handler = setTimeout(() => {
      setShowSuggestions(true);
      fetchBooks(searchTerm, 1, true);
    }, 500);

    return () => clearTimeout(handler);
  }, [searchTerm, fetchBooks]);

  // 🔹 Use Suggestions as Results (Enter/Search click)
  const handleSearch = () => {
    if (searchTerm) {
      setPage(1);
      setSearchResults(suggestions); // ✅ reuse suggestions
      setShowSuggestions(false);
    }
  };

  // 🔹 Real fetch only for pagination (with cache)
  const handlePageChange = (newPage) => {
    setPage(newPage);
    fetchBooks(searchTerm, newPage, false);
  };

  return (
    <BookContext.Provider
      value={{
        searchTerm,
        setSearchTerm,
        searchResults,
        suggestions,
        loading,
        error,
        page,
        numFound,
        showSuggestions,
        setShowSuggestions,
        handleSearch,
        handlePageChange,
        limit,
      }}
    >
      {children}
    </BookContext.Provider>
  );
};

export const useBookContext = () => useContext(BookContext);
