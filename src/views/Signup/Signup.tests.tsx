import * as React from "react";
import { render } from "@testing-library/react";
import { PasswordButton } from "./Signup.components";

describe("Signup test cases", () => {
  test("initial test", () => {
    render(<PasswordButton isPassword={true} onClick={() => {}} />);
    expect(1 + 1).toBe(2);
  });
});
