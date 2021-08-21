import React, { Component } from "react";

import CloseSearchButton from "./CloseSearchButton";
import SearchBooksInput from "./SearchBooksInput";

export default class SearchBar extends Component {
  render() {
    const { onSearch, onResetSearch } = this.props;
    return (
      <div className="search-books-bar">
        <CloseSearchButton onResetSearch={onResetSearch} />
        <SearchBooksInput onSearch={onSearch} />
      </div>
    );
  }
}
