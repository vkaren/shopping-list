import React from "react";

function SearchBox(props) {
  return (
    <div className="search-box">
      <label htmlFor="shopping">
        My shopping list
        <div className="input-box">
          <input
            type="search"
            list="shopping-list"
            name="shopping"
            id="shopping"
            onInput={props.debounce}
            onKeyDown={props.debounce}
          />
          <button className="add" onClick={props.addItem}>
            Add
          </button>
        </div>
      </label>

      <datalist id="shopping-list">
        {props.list.map((item, i) => (
          <option value={item} key={"option" + i} />
        ))}
      </datalist>
    </div>
  );
}

export default SearchBox;
