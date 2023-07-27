import React from "react";
import { render, screen } from "@testing-library/react";
import Price from "./Price";

describe("Price test", () => {
  test("should render Price", () => {
    render(<Price price={100} />);

    expect(screen.getByText("$100.00")).toBeInTheDocument();
  });
});
