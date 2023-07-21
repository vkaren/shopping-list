import ShoppingItem from "../ShoppingItem";
import "./styles.css";

const ShoppingList = ({ addedItems }) => {
  return (
    <section className="shopping-list">
      {addedItems.map((item) => (
        <ShoppingItem key={item.name} name={item.name} amount={item.amount} />
      ))}
    </section>
  );
};
export default ShoppingList;
