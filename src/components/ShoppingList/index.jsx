import { useContext } from "react";
import { AppContext } from "@context";
import ShoppingItem from "@components/ShoppingItem";
import "./styles.css";

const ShoppingList = () => {
  const { addedItems } = useContext(AppContext);

  return (
    <section className="shopping-list">
      {addedItems.map((item, index) => (
        <ShoppingItem
          key={item.name}
          id={index}
          name={item.name}
          amount={item.amount}
          isItemChecked={item.isChecked}
        />
      ))}
    </section>
  );
};
export default ShoppingList;
