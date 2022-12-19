import React from "react";
import ItemSelected from "./ItemSelected";

class App extends React.Component {
  state = {
    itemSearched: "",
    list: [],
    itemsSelected: [],
  };

  getItems = () => {
    const itemSearched = this.state.itemSearched;
    const url = `https://api.frontendeval.com/fake/food/${itemSearched}`;

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }
        return response.json();
      })
      .then((result) => this.setState({ list: result }))
      .catch((error) => console.log("Error: " + error));
  };

  addItem = () => {
    const itemSearched = this.state.itemSearched;
    const list = this.state.list.slice();
    let itemsSelected = this.state.itemsSelected.slice();

    if (list.includes(itemSearched)) {
      itemsSelected.forEach((itemSelected) => {
        if (itemSelected[itemSearched]) {
          return;
        }
      });

      itemsSelected.push({ [itemSearched]: 1 });

      this.setState({ itemsSelected });
    }
  };

  onInput = () => {
    let timer;

    return (e) => {
      clearTimeout(timer);

      const item = e.currentTarget.value;

      if (e.key === "Enter") {
        this.addItem();
      } else {
        const regex = /[a-zñ]+/gi;

        if (
          item.match(regex) &&
          item.match(regex).join("").length > 1 &&
          item.match(regex).join("").length === item.split(" ").join("").length
        ) {
          timer = setTimeout(
            () => this.setState({ itemSearched: item }, this.getItems),
            500
          );
        }
      }
    };
  };

  onIncrement = (item) => {
    let itemsSelected = this.state.itemsSelected.slice();

    itemsSelected.forEach((itemSelected) => {
      if (itemSelected[item]) {
        itemSelected[item]++;
      }
    });

    this.setState({ itemsSelected });
  };
  onDecrement = (item) => {
    let itemsSelected = this.state.itemsSelected.slice();

    itemsSelected.forEach((itemSelected) => {
      if (itemSelected[item] > 1) {
        itemSelected[item]--;
      }
    });

    this.setState({ itemsSelected });
  };
  onRemove = (item) => {
    let itemsSelected = this.state.itemsSelected.slice();

    itemsSelected.forEach((itemSelected, i) => {
      if (itemSelected[item]) {
        itemsSelected.splice(i, 1);
      }
    });

    this.setState({ itemsSelected });
  };

  onDragStart = (e) => {
    this.dragged = e.currentTarget;
  };

  onDragOver = (e) => {
    e.preventDefault();
  };

  onDrop = (e) => {
    e.preventDefault();

    let itemsSelected = this.state.itemsSelected.slice();

    const indexDragged = this.dragged.id;
    const indexDropped = e.currentTarget.id;
    const itemDragged = itemsSelected[indexDragged];

    itemsSelected.splice(indexDragged, 1);

    itemsSelected.splice(indexDropped, 0, itemDragged);

    this.setState({ itemsSelected });
  };

  render() {
    let debounce = this.onInput();

    return [
      <div className="search-box" key="search-box">
        <label htmlFor="shopping">
          My shopping list
          <div className="input-box">
            <input
              type="search"
              list="shopping-list"
              name="shopping"
              id="shopping"
              onInput={debounce}
              onKeyDown={debounce}
              onTouchStart={debounce}
            />
            <button className="add" onClick={this.addItem}>
              Add
            </button>
          </div>
        </label>

        <datalist id="shopping-list">
          {this.state.list.map((item, i) => (
            <option value={item} key={"option" + i} />
          ))}
        </datalist>
      </div>,
      <div className="items" key="items">
        {this.state.itemsSelected.map((item, i) => (
          <ItemSelected
            key={Object.keys(item)[0]}
            id={i}
            item={Object.keys(item)[0]}
            quantity={Object.values(item)[0]}
            onDragStart={this.onDragStart}
            onDragOver={this.onDragOver}
            onDrop={this.onDrop}
            onRemove={this.onRemove}
            onIncrement={this.onIncrement}
            onDecrement={this.onDecrement}
          />
        ))}
      </div>,
    ];
  }
}

export default App;
