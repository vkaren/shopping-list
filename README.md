# My shopping list

Welcome to the Shopping List app! This application allows users to efficiently manage their shopping lists by searching for items, adding them with desired quantities, checking them off, and even ordering them on desktop.

<img src="./readme_imgs/app-search.png" width="200px">

<img src="./readme_imgs/app.png" width="200px">

## Built with

- React
- Vite

## How it Works

The app utilizes a debounce function in the Searcher component to interact with the food API (https://api.frontendeval.com/fake/food/:food) as the user types. The results are displayed in a dropdown and the item is added only if it matches the search and has not been added before.

_src/components/Searcher_

<img src="./readme_imgs/Searcher.PNG" width="400px">

The addedItems list is made so the checked items are placed at the end and the unchecked before them. The list is stored in local storage to persist changes.

_src/components/App_

<img src="./readme_imgs/addItem.PNG" width="400px">

<img src="./readme_imgs/saveLocal.PNG" width="300px">

Desktop users can enjoy drag-and-drop functionality to reorder their shopping list. The draggable element is represented by a drag icon in the ShoppingItem component.

_src/components/ShoppingItem_

<img src="./readme_imgs/sort.PNG" width="400px">

On drag start, the app captures the parent element of the drag icon (the item container to be reordered).

_src/components/App_

<img src="./readme_imgs/dragStart.PNG" width="400px">

On drag over, the default behavior is prevented to allow the drop event.

Finally, on the drop event, the app checks if the item being dragged is allowed to be dropped, retrieves the indexes, and updates the list accordingly.

_src/components/App_

<img src="./readme_imgs/drop.PNG" width="400px">

Feel free to use and enhance this shopping list app for your convenience!
