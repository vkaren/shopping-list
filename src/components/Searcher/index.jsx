import { createRef, useContext, useState } from "react";
import { AppContext } from "@context";
import "./styles.css";

const Searcher = () => {
  const { addItem } = useContext(AppContext);
  const [searchedItems, setSearchedItems] = useState([]);
  const formRef = createRef();

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
        }, 250);
      }
    };
  };

  const getItems = async (itemSearched) => {
    try {
      const url = `https://api.frontendeval.com/fake/food/${itemSearched}`;
      const response = await fetch(url);
      const itemSearchedList = await response.json();

      setSearchedItems(itemSearchedList);
    } catch (err) {
      throw new Error(err);
    }
  };

  const onClickAdd = (e) => {
    e.preventDefault();

    const formData = new FormData(formRef.current);
    const itemToAdd = formData.get("searched-item");

    addItem({ itemToAdd, searchedItems });
  };

  return (
    <form ref={formRef} className="searcher-form">
      <input
        className="searcher-form__input"
        type="search"
        name="searched-item"
        list="searched-items"
        placeholder="Search..."
        autoComplete="off"
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
