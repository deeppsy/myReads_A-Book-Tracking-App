import React, { Component } from "react";
import Book from "./Book";

export default class SearchResults extends Component {
  render() {
    const { myBooks, searchBooks, onMove } = this.props;
    const updatedBooks = searchBooks.map((book) => {
      myBooks.map((b) => {
        if (b.id === book.id) {
          book.shelf = b.shelf;
        }
        return b;
      });
      return book;
    });
    return (
      <div className="search-books-results">
        <ol className="books-grid">
          {updatedBooks.map((book) => (
            <Book
              key={book.id}
              book={book}
              shelf={book.shelf ? book.shelf : "none"}
              onMove={onMove}
            />
          ))}
        </ol>
      </div>
    );
  }
}
