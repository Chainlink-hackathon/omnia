import React from 'react';
import {
  Switch,
  Route,
  withRouter,
  RouteComponentProps,
} from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import Loading from './pages/Intro/intro';
import Main from './pages/Main/main';

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
              path={process.env.PUBLIC_URL + '/'}
              component={Loading}
            />
            <Route path="/main" component={Main} />
          </Switch>
        </section>
      </CSSTransition>
    </TransitionGroup>
  );
}
export default withRouter(Router);
