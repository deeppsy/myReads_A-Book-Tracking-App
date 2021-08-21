import React, { Component } from "react";
import Book from "./Book";

export default class BookShelf extends Component {
  render() {
    const { shelf, books, onMove } = this.props;
    const booksOnThisShelf = books.filter((book) => book.shelf === shelf.key);
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{shelf.name}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {booksOnThisShelf.map((book) => (
              <Book
                book={book}
                shelf={shelf.key}
                key={book.id}
                onMove={onMove}
              />
            ))}
          </ol>
        </div>
      </div>
    );
  }
}
