import React, { Component } from "react";
import { Route } from "react-router-dom";
import { debounce } from "throttle-debounce";

import * as BooksAPI from "./BooksAPI";

import "./App.css";

import ListBooks from "./components/ListBooks";
import BookSearch from "./components/BookSearch";

const bookshelves = [
  { key: "currentlyReading", name: "Currently Reading" },
  { key: "wantToRead", name: "Want To Read" },
  { key: "read", name: "Read" },
];

class BooksApp extends Component {
  state = {
    myBooks: [],
    searchBooks: [],
  };

  moveBook = async (book, shelf) => {
    try {
      await BooksAPI.update(book, shelf);
      let updatedBooks = [];
      updatedBooks = this.state.myBooks.filter((b) => b.id !== book.id);

      if (shelf !== "none") {
        book.shelf = shelf;
        updatedBooks = updatedBooks.concat(book);
      }

      this.setState({
        myBooks: updatedBooks,
      });
    } catch (e) {
      console.log(e);
    }
  };

  searchForBooks = debounce(300, false, (query) => {
    if (query.length > 0) {
      BooksAPI.search(query)
        .then((books) => {
          if (books.error) {
            this.setState({ searchBooks: [] });
          } else {
            this.setState({ searchBooks: books });
          }
        })
        .catch((e) => console.log(e));
    } else {
      this.setState({ searchBooks: [] });
    }
  });

  resetSearch = () => {
    this.setState({ searchBooks: [] });
  };

  componentDidMount = () => {
    BooksAPI.getAll()
      .then((books) => {
        this.setState({ myBooks: books });
      })
      .catch((e) => console.log(e));
  };

  render() {
    const { myBooks, searchBooks } = this.state;
    return (
      <div className="app">
        <Route
          exact
          path="/"
          render={() => (
            <ListBooks
              bookshelves={bookshelves}
              books={myBooks}
              onMove={this.moveBook}
            />
          )}
        />
        <Route
          path="/search"
          render={() => (
            <BookSearch
              searchBooks={searchBooks}
              myBooks={myBooks}
              onMove={this.moveBook}
              onSearch={this.searchForBooks}
              onResetSearch={this.resetSearch}
            />
          )}
        />
      </div>
    );
  }
}

export default BooksApp;
