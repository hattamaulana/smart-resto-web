import React from 'react';
import ReactDOM from 'react-dom';
import RouteApp from './router/Router';

import './index.css';
import { FirebaseApp, FirebaseContext } from './config/Firebase'
// import * as serviceWorker from './serviceWorker';

ReactDOM.render(
   <FirebaseContext.Provider value={ new FirebaseApp() }>
      <RouteApp />
   </FirebaseContext.Provider>,
   document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
