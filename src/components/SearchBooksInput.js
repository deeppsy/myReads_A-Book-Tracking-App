import React, { Component } from "react";

export default class SearchBooksInput extends Component {
  state = {
    value: "",
  };

  handleChange = (e) => {
    const val = e.target.value;
    this.setState({ value: val }, () => {
      this.props.onSearch(val);
    });
  };
  render() {
    return (
      <div className="search-books-input-wrapper">
        <input
          type="text"
          placeholder="Search by title or author"
          value={this.state.value}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}
