import Pagination from "./Components/Pagination"
import SearchInput from "./Components/SearchInput"
import SearchResults from "./Components/SearchResults"
import Suggestions from "./Components/Suggestions"
import { BookProvider } from "./context/BookContext"

function App() {
  

  return (
    <>
      <BookProvider>
      <div className="flex flex-col items-center p-6 min-h-screen bg-gray-100">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">📚 Book Search</h1>
        <div className="relative w-full max-w-md">
          <SearchInput />
          <Suggestions />
        </div>
        <div className="w-full max-w-2xl mt-6">
          <SearchResults />
          <Pagination />
        </div>
      </div>
    </BookProvider>
    </>
  )
}

export default App
