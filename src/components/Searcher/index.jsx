import "./styles.css";

const Searcher = ({ searchItem, addItem, searchedItems }) => (
  <form className="searcher-form">
    <input
      className="searcher-form__input"
      type="search"
      name="searched-item"
      list="searched-items"
      placeholder="Search..."
      // onKeyUp={searchItem}
    />

    <button
      className="searcher-form__add-btn"
      aria-label="Add item"
      // onClick={addItem}
    >
      Add
    </button>

    <datalist id="searched-items">
      {/* {searchedItems.map((item, i) => (
          <option value={item} key={"option" + i} />
        ))} */}
    </datalist>
  </form>
);

export default Searcher;
