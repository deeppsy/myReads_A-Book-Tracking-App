import React, { Component } from "react";

import SearchBar from "./SearchBar";
import SearchResults from "./SearchResults";

export default class BookSearch extends Component {
  render() {
    const {
      myBooks,
      searchBooks,
      onSearch,
      onResetSearch,
      onMove,
    } = this.props;
    return (
      <div className="search-books">
        <SearchBar onSearch={onSearch} onResetSearch={onResetSearch} />
        <SearchResults
          myBooks={myBooks}
          onMove={onMove}
          searchBooks={searchBooks}
        />
      </div>
    );
  }
}
