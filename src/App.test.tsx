import React from "react";
import { render, screen } from "@testing-library/react";
import Header from "./Header";

test("Empty Header", async () => {
  // ARRANGE
  render(
    <Header
      onSearch={() => null}
      enableRoot
      searchText=""
      goToRoot={() => null}
    />
  );
  // ASSERT
  expect(screen.getByTestId("searchInput")).toHaveTextContent("");
  expect(screen.getByTestId("root")).toHaveClass("row-item home");
});

test("Non-Empty Header", async () => {
  // ARRANGE
  render(
    <Header
      onSearch={() => null}
      enableRoot
      searchText="Logo"
      goToRoot={() => null}
    />
  );
  // ASSERT
  expect(screen.getByTestId("searchInput")).toHaveDisplayValue("Logo");
  expect(screen.getByTestId("clear")).toHaveClass("row-item home-active");
});
