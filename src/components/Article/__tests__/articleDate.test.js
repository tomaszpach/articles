import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";

import ArticleDate from "../articleDate";

describe("ArticleDate", () => {
  test("should correctly render ArticleDate component", () => {
    const wrapper = shallow(<ArticleDate date="5. februar 2019" />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
