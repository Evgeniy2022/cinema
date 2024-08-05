
import "./SearchInput.css";

export function SearchInput({ setCurrentPage, inputValue, setInputValue }) {
  return (
    <input
      className="search-input"
      placeholder="Type to search..."
      value={inputValue}
      onChange={(e) => {
        setInputValue(e.target.value);
        setCurrentPage(1);
      }}
    />
  );
}
