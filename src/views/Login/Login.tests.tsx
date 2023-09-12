import * as React from "react";
import { render } from "@testing-library/react";
import Login from "./index";

describe("Signup test cases", () => {
  test("initial test", () => {
    render(<Login />);
    expect(1 + 1).toBe(2);
  });
});
