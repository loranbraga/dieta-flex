import React from 'react'
import { Route, BrowserRouter as Router  } from 'react-router-dom'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor }from './store'

import SignIn from './pages/sign-in'
import SignUp from './pages/sign-up'

function App() {
  return (
    <div className='App'>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Router>
            <Route exact path='/' component={SignIn} />
            <Route exact path='/sign-up' component={SignUp} />
          </Router>
        </PersistGate>
      </Provider>
    </div>
  );
}

export default App;
