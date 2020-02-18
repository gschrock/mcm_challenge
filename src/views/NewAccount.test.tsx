import { shallow } from "enzyme";
import React from "react";
import { NewAccount } from "./NewAccount";

jest.mock("react-router-dom", () => ({
  useHistory: () => ({
    push: jest.fn()
  })
}));

describe("NewAccount view", () => {
  it("renders", () => {
    const wrapper = shallow(<NewAccount loanResponse={{ qualified: true }} />);
    expect(wrapper).toMatchSnapshot();
  });
});
