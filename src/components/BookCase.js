import React, { Component } from "react";
import BookShelf from "./BookShelf";

export default class BookCase extends Component {
  render() {
    const { bookshelves, books, onMove } = this.props;
    return (
      <div className="list-books-content">
        <div>
          {bookshelves.map((shelf) => (
            <BookShelf
              key={shelf.key}
              shelf={shelf}
              books={books}
              onMove={onMove}
            />
          ))}
        </div>
      </div>
    );
  }
}
