import { useState } from "react";
import dragIcon from "../../assets/icons/icon-drag.png";
import deleteIcon from "../../assets/icons/icon-delete.png";
import plusIcon from "../../assets/icons/icon-plus.png";
import minusIcon from "../../assets/icons/icon-minus.png";
import "./styles.css";

const ShoppingItem = ({
  id,
  name,
  amount,
  isItemChecked,
  setNewAmount,
  deleteItem,
  onCheckItem,
  onDragStart,
  onDragOver,
  onDrop,
}) => {
  const [isChecked, setIsChecked] = useState(isItemChecked);

  const onClickIncrementAmount = () => {
    const newAmount = amount + 1;
    setNewAmount({ name, newAmount });
  };

  const onClickDecrementAmount = () => {
    if (amount > 1) {
      const newAmount = amount - 1;
      setNewAmount({ name, newAmount });
    }
  };

  const onClickDelete = () => {
    deleteItem(name);
  };

  const onClickCheck = (e) => {
    const isChecked = e.currentTarget.checked;
    setIsChecked(isChecked);
    onCheckItem({ name, isChecked });
  };

  return (
    <div id={id} className="shopping-list__item">
      <div
        className={`item_drag-icon ${isChecked && "item-checked"}`}
        onDragStart={onDragStart}
        onDragOver={onDragOver}
        onDrop={onDrop}
        draggable={!isChecked}
      >
        <img src={dragIcon} alt="Drag item" />
      </div>

      <div className="item_content_container">
        <div className="item_content">
          <input
            type="checkbox"
            id={name}
            className="item_content-check"
            onChange={onClickCheck}
            checked={isChecked}
          />
          <label htmlFor={name}>
            <span className="item_content-description">{`${amount} ${name}`}</span>
          </label>
        </div>

        <div
          className={`item_content_set-amount-btns ${
            isChecked && "item-checked"
          }`}
        >
          <button className="decrement-btn" onClick={onClickDecrementAmount}>
            <img src={minusIcon} alt="Decrement amount" />
          </button>
          <button className="increment-btn" onClick={onClickIncrementAmount}>
            <img src={plusIcon} alt="Increment amount" />
          </button>
        </div>
      </div>

      <button className="item_delete-btn" onClick={onClickDelete}>
        <img src={deleteIcon} alt="Delete item" />
      </button>
    </div>
  );
};
export default ShoppingItem;
