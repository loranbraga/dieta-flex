import React from 'react'
import { Route, BrowserRouter as Router  } from 'react-router-dom'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor }from './store'

import SignIn from './pages/sign-in'
import SignUp from './pages/sign-up'
import Home from './pages/home'
import Profile from './pages/profile'
import Meters from './pages/meters'
import Foods from './pages/foods'
import FoodRegister from './pages/foods/register'
import Diary from './pages/diary'
import MeterRegister from './pages/meters/register'
import DiaryRegister from './pages/diary/register'

function App() {
  return (
    <div className='App'>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Router>
            <Route exact path='/' component={SignIn} />
            <Route exact path='/sign-up' component={SignUp} />
            <Route exact path='/home' component={Home} />
            <Route exact path='/profile' component={Profile} />
            <Route exact path='/meters' component={Meters} />
            <Route exact path='/meters/register' component={MeterRegister} />
            <Route exact path='/foods' component={Foods} />
            <Route exact path='/foods/register' component={FoodRegister} />
            <Route exact path='/diary' component={Diary} />
            <Route exact path='/diary/register' component={DiaryRegister} />
          </Router>
        </PersistGate>
      </Provider>
    </div>
  );
}

export default App;
