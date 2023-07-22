import { useEffect, useState } from "react";
import "./styles.css";

const Searcher = ({ getItems, addItem, searchedItems }) => {
  const [itemToAdd, setItemToAdd] = useState("");
  const [isEnterPressed, setIsEnterPressed] = useState(false);

  useEffect(() => {
    if (isEnterPressed) {
      addItem(itemToAdd);
      setIsEnterPressed(false);
    }
  }, [isEnterPressed]);

  const onSearchItem = () => {
    let timer;

    return (e) => {
      if (timer) {
        clearTimeout(timer);
      }

      const itemSearched = e.currentTarget.value;
      const allowedCharacters = /([a-zñ\s]){2,}/gi;

      if (allowedCharacters.test(itemSearched)) {
        timer = setTimeout(() => {
          getItems(itemSearched);
          setItemToAdd(itemSearched);
        }, 250);
      }
    };
  };

  const onClickAdd = (e) => {
    e.preventDefault();
    addItem(itemToAdd);
  };

  const onEnterKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      setIsEnterPressed(true);
    }
  };

  return (
    <form className="searcher-form">
      <input
        className="searcher-form__input"
        type="search"
        name="searched-item"
        list="searched-items"
        placeholder="Search..."
        autoComplete="off"
        onKeyDown={onEnterKeyPress}
        onInput={onSearchItem()}
      />

      <button
        className="searcher-form__add-btn"
        aria-label="Add item"
        onClick={onClickAdd}
      >
        Add
      </button>

      <datalist id="searched-items">
        {searchedItems.map((item, i) => (
          <option value={item} key={"option" + i} />
        ))}
      </datalist>
    </form>
  );
};

export default Searcher;
