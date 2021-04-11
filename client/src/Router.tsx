import React from "react";
import {
  Switch,
  Route,
  withRouter,
  RouteComponentProps,
} from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import Loading from "./pages/Intro/intro";
import Main from "./pages/Main/main";
import InsuranceList from "./pages/InsuranceList/insuranceList";
import InsuranceDetail from "./pages/InsuranceDetail/insuranceDetail";

interface MatchParams {
  id: string;
}

function Router({ location }: RouteComponentProps<MatchParams>) {
  return (
    <TransitionGroup className="transition-group">
      <CSSTransition
        key={location.key}
        timeout={{ enter: 300, exit: 300 }}
        classNames="fade"
      >
        <section className="route-section">
          <Switch location={location}>
            <Route
              exact
              path={process.env.PUBLIC_URL + "/"}
              component={Loading}
            />
            <Route path="/main" component={Main} />
            <Route path="/insuranceList" component={InsuranceList} />
            <Route path="/insuranceDetail" component={InsuranceDetail} />
          </Switch>
          <Route
              path="/about-project"
              component={() => {
                window.location.href = "https://youtu.be/W5YVbma8Xwo";
                return null;
              }}
            />
        </section>
      </CSSTransition>
    </TransitionGroup>
  );
}
export default withRouter(Router);
