import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";

import ArticlePreamble from "../articlePreamble";

describe("ArticlePreamble", () => {
  test("should correctly render ArticlePreamble component", () => {
    const wrapper = shallow(<ArticlePreamble preamble="lorem ipsum dolor sit amet" />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
