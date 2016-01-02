import React from 'react';
import ReactDOM from 'react-dom';
import { Route, IndexRoute, browserHistory } from 'react-router';
import { RelayRouter } from 'react-router-relay';
import App from './App';

const RootQueries = {
    root: () => Relay.QL`query { hello }`
};

ReactDOM.render((
    <RelayRouter history={ browserHistory }>
        <Route path='/'>
            <IndexRoute component={ App } />
        </Route>
    </RelayRouter>
), document.getElementById('root'));
