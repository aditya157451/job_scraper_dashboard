function SearchBar({
  search,
  setSearch,
  location,
  setLocation,
  company,
  setCompany,
  source,
  setSource,
  onSearch,
  onClear
}) {
  return (
    <div className="search-container">

      <input
        type="text"
        placeholder="Search job title..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <input
        type="text"
        placeholder="Location..."
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />

      <input
        type="text"
        placeholder="Company..."
        value={company}
        onChange={(e) => setCompany(e.target.value)}
      />

      <select
        value={source}
        onChange={(e) => setSource(e.target.value)}
      >
        <option value="">All Sources</option>
        <option value="Test">Test</option>
        <option value="LinkedIn">LinkedIn</option>
        <option value="Indeed">Indeed</option>
      </select>

      <button onClick={onSearch}>
        Search
      </button>

      <button
        onClick={onClear}
        className="clear-button"
      >
        Clear
      </button>

    </div>
  );
}

export default SearchBar;