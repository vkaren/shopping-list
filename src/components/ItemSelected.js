import React from "react";

class ItemSelected extends React.Component {
  state = {
    disabled: false,
  };

  disabled = () => {
    if (this.checkRef.current && this.checkRef.current.checked) {
      this.setState({ disabled: true });
    } else {
      this.setState({ disabled: false });
    }
  };
  checkRef = React.createRef();
  render() {
    return (
      <div
        className="item"
        id={this.props.id}
        draggable="true"
        onDragStart={this.props.onDragStart}
        onDragOver={this.props.onDragOver}
        onDrop={this.props.onDrop}
      >
        <img
          className="sort-icon"
          src="https://img.icons8.com/ios-glyphs/30/null/drag-list-up.png"
        />
        <input
          type="checkbox"
          className="check"
          id={this.props.id}
          ref={this.ref}
          onChange={this.disabled}
        />
        <img
          className="check-icon"
          src="https://img.icons8.com/material-rounded/24/null/checkmark--v1.png"
        />
        <div>
          <span>{`${this.props.quantity} ${this.props.item}`}</span>
          <button
            className="remove"
            onClick={() => this.props.onRemove(this.props.item)}
            disabled={this.state.disabled}
          >
            ×
          </button>
          <button
            className="inc"
            onClick={() => this.props.onIncrement(this.props.item)}
            disabled={this.state.disabled}
          >
            +
          </button>
          <button
            className="dec"
            onClick={() => this.props.onDecrement(this.props.item)}
            disabled={this.state.disabled}
          >
            -
          </button>
        </div>
      </div>
    );
  }
}

export default ItemSelected;
