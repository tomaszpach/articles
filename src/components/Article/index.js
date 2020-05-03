import React, { Fragment } from "react";

// Components
import ArticleDate from "./articleDate";
import ArticleImage from "./articleImage";
import ArticlePreamble from "./articlePreamble";
import ArticleTitle from "./articleTitle";

const Articles = ({ articles, categorySelected }) => {
  const selectedArticles = articles.filter((article) => {
    if (categorySelected.fashion && categorySelected.sports) {
      return true;
    }
    if (categorySelected.fashion) {
      return article.category === "fashion";
    }
    if (categorySelected.sports) {
      return article.category === "sport";
    }
  });

  return (
    <Fragment>
      {selectedArticles &&
        selectedArticles.map((sport) => {
          return (
            <div key={sport.id} className="single-article">
              {sport.image ? (
                <ArticleImage img={sport.image} />
              ) : (
                <ArticleImage img="https://image.shutterstock.com/image-vector/default-ui-image-placeholder-wireframes-260nw-1037719192.jpg" />
              )}
              <div className="article-description">
                <div className="title-date-wrapper">
                  <ArticleTitle title={sport.title} />
                  <ArticleDate date={sport.date} />
                </div>
                <ArticlePreamble preamble={sport.preamble} />
              </div>
            </div>
          );
        })}
    </Fragment>
  );
};

export default Articles;
