import { shallow } from "enzyme";
import React from "react";
import { Landing } from "./Landing";

jest.mock("react-router-dom", () => ({
  useHistory: () => ({
    push: jest.fn()
  })
}));

describe("Landing view", () => {
  it("renders", () => {
    const wrapper = shallow(
      <Landing loanResponse={null} handleSetLoanResponse={() => {}} />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
