import ShoppingItem from "../ShoppingItem";
import "./styles.css";

const ShoppingList = ({ shoppingList }) => {
  return (
    <section className="shopping-list">
      {/* {shoppingList.map((item) => (
        <ShoppingItem key={item.name} name={item.name} amount={item.amount} />
      ))} */}

      <ShoppingItem name="Apple" amount={1} />
      <ShoppingItem name="Orange" amount={1} />
      <ShoppingItem name="Apple" amount={1} />
      <ShoppingItem name="Orange" amount={1} />
      <ShoppingItem name="Apple" amount={1} />
      <ShoppingItem name="Orange" amount={1} />
      <ShoppingItem name="Apple" amount={1} />
      <ShoppingItem name="Orange" amount={1} />
    </section>
  );
};
export default ShoppingList;
