import { useEffect, useState } from "react";
import Searcher from "../Searcher";
import ShoppingList from "../ShoppingList";

const App = () => {
  const [searchedItems, setSearchedItems] = useState([]);
  const [addedItems, setAddedItems] = useState(
    JSON.parse(localStorage.getItem("shopping-list")) || []
  );
  let draggedItem = null;

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

  const addBeforeCheckedItem = ({ itemsList, itemToAdd }) => {
    const firstItemCheckedIndex = itemsList.findIndex((item) => item.isChecked);

    return [
      ...itemsList.slice(0, firstItemCheckedIndex),
      itemToAdd,
      ...itemsList.slice(firstItemCheckedIndex),
    ];
  };

  const addItem = (itemToAdd) => {
    const isItemAlreadyAdded = addedItems.find(
      (item) => item.name === itemToAdd
    );

    if (searchedItems.includes(itemToAdd) && !isItemAlreadyAdded) {
      const itemToAddInfo = {
        name: itemToAdd,
        amount: 1,
        isChecked: false,
      };

      let newAddedItems = addBeforeCheckedItem({
        itemsList: addedItems,
        itemToAdd: itemToAddInfo,
      });

      setAddedItems(newAddedItems);
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

  const deleteItem = (name) => {
    const newAddedItems = addedItems.filter((item) => item.name !== name);
    setAddedItems(newAddedItems);
  };

  const onCheckItem = ({ name, isChecked }) => {
    const itemToCheck = addedItems.find((item) => item.name === name);
    let newAddedItems = addedItems.filter((item) => item.name !== name);

    if (isChecked) {
      itemToCheck.isChecked = true;

      newAddedItems.push(itemToCheck);
    } else {
      itemToCheck.isChecked = false;

      newAddedItems = addBeforeCheckedItem({
        itemsList: newAddedItems,
        itemToAdd: itemToCheck,
      });
    }

    setAddedItems(newAddedItems);
  };

  const onDragStart = (e) => {
    draggedItem = e.currentTarget.parentElement;
  };

  const onDragOver = (e) => {
    e.preventDefault();
  };

  const onDrop = (e) => {
    e.preventDefault();
    const droppedItem = e.currentTarget.parentElement;

    if (draggedItem && droppedItem.draggable) {
      const indexDraggedItem = draggedItem.id - "";
      const indexDroppedItem = droppedItem.id - "";
      const draggedItemAdded = addedItems[indexDraggedItem];

      let newAddedItems = addedItems.filter(
        (_, index) => indexDraggedItem !== index
      );

      newAddedItems.splice(indexDroppedItem, 0, draggedItemAdded);

      setAddedItems(newAddedItems);
    }
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
      <ShoppingList
        addedItems={addedItems}
        setNewAmount={setNewAmount}
        deleteItem={deleteItem}
        onCheckItem={onCheckItem}
        onDragStart={onDragStart}
        onDragOver={onDragOver}
        onDrop={onDrop}
      />
    </>
  );
};

export default App;
