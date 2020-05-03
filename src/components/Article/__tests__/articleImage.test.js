import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";

import ArticleImage from "../articleImage";

describe("ArticleImage", () => {
  test("should correctly render ArticleImage component", () => {
    const wrapper = shallow(<ArticleImage img="https://image.shutterstock.com/image-vector/default-ui-image-placeholder-wireframes-260nw-1037719192.jpg" />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
