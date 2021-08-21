import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class CloseSearchButton extends Component {
  render() {
    const { onResetSearch } = this.props;
    return (
      <Link to="/">
        <button className="close-search" onClick={onResetSearch}>
          Close
        </button>
      </Link>
    );
  }
}
