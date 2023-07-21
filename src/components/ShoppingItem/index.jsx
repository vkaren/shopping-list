import dragIcon from "../../assets/icons/icon-drag.png";
import deleteIcon from "../../assets/icons/icon-delete.png";
import plusIcon from "../../assets/icons/icon-plus.png";
import minusIcon from "../../assets/icons/icon-minus.png";
import "./styles.css";

const ShoppingItem = ({ name, amount, setNewAmount, deleteItem }) => {
  // state = {
  //   disabled: false,
  // };

  // disabled = () => {
  //   if (this.checkRef.current && this.checkRef.current.checked) {
  //     this.setState({ disabled: true });
  //   } else {
  //     this.setState({ disabled: false });
  //   }
  // };
  // checkRef = React.createRef();

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

  return (
    <div
      className="shopping-list__item"
      draggable="true"
      //   onDragStart={this.props.onDragStart}
      //   onDragOver={this.props.onDragOver}
      //   onDrop={this.props.onDrop}
    >
      <div className="item_drag-icon">
        <img src={dragIcon} alt="Drag item" />
      </div>

      <div className="item_content_container">
        <div className="item_content">
          <input
            type="checkbox"
            className="item_content-check"
            // id={this.props.id}
            // ref={this.ref}
            // onChange={this.disabled}
          />
          <span className="item_content-description">{`${amount} ${name}`}</span>
        </div>

        <div className="item_content_set-amount-btns">
          <button
            className="decrement-btn"
            onClick={onClickDecrementAmount}
            //   disabled={this.state.disabled}
          >
            <img src={minusIcon} alt="Decrement amount" />
          </button>
          <button
            className="increment-btn"
            onClick={onClickIncrementAmount}
            //   disabled={this.state.disabled}
          >
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
