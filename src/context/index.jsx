import { createContext, useEffect, useState } from "react";

const AppContext = createContext({});

const getAddedItemsStorage = () =>
  JSON.parse(localStorage.getItem("shopping-list"));

function AppProvider({ children }) {
  const [addedItems, setAddedItems] = useState(getAddedItemsStorage() || []);
  const [draggedItem, setDraggedItem] = useState(null);

  useEffect(() => {
    saveInLocalstorage(addedItems);
  }, [addedItems]);

  const saveInLocalstorage = (shoppingList) => {
    localStorage.setItem("shopping-list", JSON.stringify(shoppingList));
  };

  const addItem = ({ itemToAdd, searchedItems }) => {
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

  const saveNewAmountItemLS = ({ name, newAmount }) => {
    const newAddedItems = addedItems.map((item) => {
      if (item.name === name) {
        return { ...item, amount: newAmount };
      }
      return item;
    });

    saveInLocalstorage(newAddedItems);
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

  const addBeforeCheckedItem = ({ itemsList, itemToAdd }) => {
    const firstItemCheckedIndex = itemsList.findIndex((item) => item.isChecked);

    if (firstItemCheckedIndex < 0) {
      return [...itemsList, itemToAdd];
    }

    return [
      ...itemsList.slice(0, firstItemCheckedIndex),
      itemToAdd,
      ...itemsList.slice(firstItemCheckedIndex),
    ];
  };

  const onDrop = (e) => {
    e.preventDefault();
    const droppedItem = e.currentTarget;

    if (draggedItem && droppedItem.draggable) {
      const indexDraggedItem = draggedItem.id - "";
      const indexDroppedItem = droppedItem.parentElement.id - "";
      const itemToOrder = addedItems[indexDraggedItem];

      // Delete old position
      let newAddedItems = addedItems.filter(
        (_, index) => indexDraggedItem !== index
      );

      // Set new position
      newAddedItems.splice(indexDroppedItem, 0, itemToOrder);

      setAddedItems(newAddedItems);
    }
  };

  return (
    <AppContext.Provider
      value={{
        addedItems,
        addItem,
        deleteItem,
        saveNewAmountItemLS,
        setDraggedItem,
        onCheckItem,
        onDrop,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export { AppContext, AppProvider };
