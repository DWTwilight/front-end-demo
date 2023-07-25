import React from "react";
import { render, screen } from "@testing-library/react";
import CustomFooter from "./CustomFooter";

describe("CustomFooter test", () => {
  test("should render CustomFooter", () => {
    render(<CustomFooter />);

    expect(screen.getByText("online store footer")).toBeInTheDocument();
  });
});
