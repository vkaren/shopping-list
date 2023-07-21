import { useEffect, useState } from "react";
import Searcher from "../Searcher";
import ShoppingList from "../ShoppingList";

const App = () => {
  const [searchedItems, setSearchedItems] = useState([]);
  const [addedItems, setAddedItems] = useState(
    JSON.parse(localStorage.getItem("shopping-list")) || []
  );

  useEffect(() => {
    saveInLocalstorage(addedItems);
  }, [addedItems]);

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

  const addItem = (itemToAdd) => {
    const isItemAlreadyAdded = addedItems.find(
      (item) => item.name === itemToAdd
    );

    if (searchedItems.includes(itemToAdd) && !isItemAlreadyAdded) {
      const itemToAddInfo = {
        name: itemToAdd,
        amount: 1,
      };
      setAddedItems((addedItems) => [...addedItems, itemToAddInfo]);
    }
  };

  const setNewAmount = ({ name, newAmount }) => {
    const newAddedItems = addedItems.map((item) => {
      if (item.name === name) {
        item.amount = newAmount;
      }
      return item;
    });

    setAddedItems(newAddedItems);
  };

  const saveInLocalstorage = (shoppingList) => {
    localStorage.setItem("shopping-list", JSON.stringify(shoppingList));
  };

  return (
    <>
      <Searcher
        getItems={getItems}
        searchedItems={searchedItems}
        addItem={addItem}
      />
      <ShoppingList addedItems={addedItems} setNewAmount={setNewAmount} />
    </>
  );
};

export default App;
