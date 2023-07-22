import ShoppingItem from "../ShoppingItem";
import "./styles.css";

const ShoppingList = ({
  addedItems,
  setNewAmount,
  deleteItem,
  onCheckItem,
  onDragStart,
  onDragOver,
  onDrop,
}) => {
  return (
    <section className="shopping-list">
      {addedItems.map((item, index) => (
        <ShoppingItem
          key={item.name}
          id={index}
          name={item.name}
          amount={item.amount}
          setNewAmount={setNewAmount}
          deleteItem={deleteItem}
          onCheckItem={onCheckItem}
          onDragStart={onDragStart}
          onDragOver={onDragOver}
          onDrop={onDrop}
        />
      ))}
    </section>
  );
};
export default ShoppingList;
