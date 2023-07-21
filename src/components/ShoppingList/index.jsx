import ShoppingItem from "../ShoppingItem";
import "./styles.css";

const ShoppingList = ({ addedItems, setNewAmount, deleteItem }) => {
  return (
    <section className="shopping-list">
      {addedItems.map((item) => (
        <ShoppingItem
          key={item.name}
          name={item.name}
          amount={item.amount}
          setNewAmount={setNewAmount}
          deleteItem={deleteItem}
        />
      ))}
    </section>
  );
};
export default ShoppingList;
