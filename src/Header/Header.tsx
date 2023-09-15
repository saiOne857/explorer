import React, { Children, useEffect, useRef, useState } from "react";
import "./style.css";
import { debounce } from "../utils";

interface Props {
  enableRoot: boolean;
  goToRoot: () => void;
  onSearch: (t: string) => void;
  searchText: string;
}

const Header = (props: Props) => {
  const onTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    debounceText(e.target.value);
  };
  const debounceText = debounce(
    (textValue: string) => props.onSearch(textValue),
    40
  );

  return (
    <div className="header">
      <div
        data-testid="root"
        tabIndex={0}
        className={`row-item ${props.enableRoot ? "home" : "home-active"}`}
        onClick={() => !props.enableRoot && props.goToRoot()}
      >
        Root
      </div>
      <div className="row-item flex-one row">
        <input
          data-testid="searchInput"
          placeholder="search"
          className="search"
          value={props.searchText}
          onChange={onTextChange}
        />
      </div>
      <div
        data-testid="clear"
        tabIndex={0}
        className={`row-item ${!!!props.searchText ? "home" : "home-active"}`}
        onClick={() => props.onSearch("")}
      >
        clear
      </div>
    </div>
  );
};

export default Header;
