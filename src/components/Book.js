import React, { Component } from "react";
import BookShelfChanger from "./BookShelfChanger";

export default class Book extends Component {
  render() {
    const { book, shelf, onMove } = this.props;
    return (
      <li>
        <div className="book">
          <div className="book-top">
            <div
              className="book-cover"
              style={{
                width: 128,
                height: 193,
                backgroundImage: `url(${
                  book.imageLinks ? book.imageLinks.thumbnail : ""
                })`,
              }}
            />
            <BookShelfChanger book={book} shelf={shelf} onMove={onMove} />
          </div>
          <div className="book-title">{book.title}</div>
          <div className="book-authors">
            {book.authors
              ? book.authors.length > 1
                ? book.authors.join(", ")
                : book.authors[0]
              : "No Author"}
          </div>
        </div>
      </li>
    );
  }
}
