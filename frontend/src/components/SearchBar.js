const SearchBar = ({ searchTerm, setSearchTerm, handleSearch }) => {
    return (
        <div className="mb-4 flex space-x-2">
            <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="キーワードを入力..."
                className="border border-gray-300 rounded px-3 py-2 w-72 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
                onClick={handleSearch}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
            >
                検索
            </button>
        </div>
    )
};
export default SearchBar;