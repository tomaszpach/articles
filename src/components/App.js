// Description for those who is going to review that.
// What I would like to change and/or improve:
// Api call/fetch - create better error handling
// Tests - add few more examples that does more than checks snapshots
// Split components - components Header, Sorting and Data Source could be splitted
// Double check styles and components - check for consistency
// React classnames - maybe add classnames and use it to manage states

import React, { Component, Fragment } from "react";
import Articles from "./Article/index";

import "./styles.scss";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      articles: [],
      errors: false,
      categorySelected: {
        fashion: true,
        sports: false,
      },
    };
  }

  getApiData(endpoint) {
    fetch(`http://127.0.0.1:6010/${endpoint}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else if (response.status === 500) {
          this.setState({ errors: response.status });
          throw Error(`Error: ${response.status} - ${response.statusText}`);
        } else if (response.status === 404) {
          this.setState({ errors: response.status });
          throw Error(`Error: ${response.status} - ${response.statusText}`);
        }
      })
      .then((data) => {
        this.setState({
          articles: [...this.state.articles, data.articles],
        });
      })
      .catch((error) => {
        console.warn("Error occured", error);
      })
      .finally(() => {
        this.setState({ isLoading: false });
      });
  }

  changeCategory(category) {
    this.setState({
      categorySelected: {
        ...this.state.categorySelected,
        [category]: !this.state.categorySelected[category],
      },
    });
  }

  mergedArticles() {
    return [].concat.apply([], this.state.articles);
  }

  fixDate(dateToFix) {
    const months = {
      oktober: "october",
      mai: "may",
      september: "september",
      januar: "january",
      februar: "february",
      desember: "december",
      november: "november",
    };

    let fixedDate = dateToFix.split(" ");
    fixedDate[1] = months[fixedDate[1]];

    return fixedDate;
  }

  sortArticles(direction) {
    const mergedArtilces = this.mergedArticles();
    const sortedArticles = mergedArtilces.sort((a, b) => {
      const fixedDateA = this.fixDate(a.date);
      const fixedDateB = this.fixDate(b.date);

      const dateA = new Date(fixedDateA).getTime();
      const dateB = new Date(fixedDateB).getTime();

      if (
        typeof dateA === "number" &&
        typeof dateB === "number" &&
        direction === "asc"
      ) {
        return dateA - dateB;
      }
      if (
        typeof dateA === "number" &&
        typeof dateB === "number" &&
        direction === "desc"
      ) {
        return dateB - dateA;
      }
      return -1;
    });

    this.setState({
      articles: sortedArticles,
    });
  }

  componentDidMount() {
    this.getApiData("articles/sports");
    this.getApiData("articles/fashion");
  }

  render() {
    return (
      <Fragment>
        <header>
          <div>Logo</div>
          <div>Main page</div>
          <button className="header-menu" type="button">
            <span className="button-row button-row--first" />
            <span className="button-row button-row--second" />
            <span className="button-row button-row--third" />
          </button>
        </header>
        <div className="sorting">
          <h4 className="sort-by">Sort by date</h4>
          <span onClick={() => this.sortArticles("asc")} className="sort-asc" />
          <span
            onClick={() => this.sortArticles("desc")}
            className="sort-desc"
          />
        </div>

        <div className="data-source">
          <form>
            <h4>Data sources</h4>
            <div className="checkboxes">
              <div className="form-group">
                <input
                  type="checkbox"
                  id="fashion"
                  checked={this.state.categorySelected.fashion}
                  onChange={() => this.changeCategory("fashion")}
                />
                <label htmlFor="fashion">Fashion</label>
              </div>
              <div className="form-group">
                <input
                  type="checkbox"
                  id="sports"
                  checked={this.state.categorySelected.sports}
                  onChange={() => this.changeCategory("sports")}
                />
                <label htmlFor="sports">Sports</label>
              </div>
            </div>
          </form>
        </div>
        <div className={`articles ${this.state.isLoading ? "loading" : ""}`}>
          {this.state.isLoading ? (
            <div className="loader"></div>
          ) : this.state.errors ? (
            "Something wen't wrong. Please refresh the page"
          ) : (
            <Articles
              articles={this.mergedArticles()}
              categorySelected={this.state.categorySelected}
            />
          )}
        </div>
      </Fragment>
    );
  }
}

export default App;
