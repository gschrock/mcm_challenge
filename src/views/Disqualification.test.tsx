import { shallow } from "enzyme";
import React from "react";
import { Disqualification } from "./Disqualification";

jest.mock("react-router-dom", () => ({
  useHistory: () => ({
    push: jest.fn()
  })
}));

describe("Disqualification view", () => {
  it("renders with disqualification message", () => {
    const wrapper = shallow(
      <Disqualification
        loanResponse={{ qualified: false, message: "Not qualified message." }}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
