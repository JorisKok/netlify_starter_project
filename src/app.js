import {Component} from "preact";
import {Router} from "preact-router";
import {Provider} from "@preact/prerender-data-provider";

// Code-splitting is automated for routes
import Home from "./views/Home/Home.js";
import NotFoundPage from "./views/NotFound/NotFound.js";

export default class App extends Component {
  // state.getData(props);
  /** Gets fired when the route changes.
   *  @param {Object} event    "change" event from [preact-router](https://github.com/preactjs/preact-router)
   *  @param {string} event.url  The newly routed URL
   */
  handleRoute = (e) => {
    this.currentUrl = e.url;
  };

  render(props) {
    return (
      <Provider value={props}>
        <div id="app">
          <Router onChange={this.handleRoute}>
            <Home path="/" />
            <Home path={`/:language`} />
            <NotFoundPage type="404" default />
          </Router>
        </div>
      </Provider>
    );
  }
}
