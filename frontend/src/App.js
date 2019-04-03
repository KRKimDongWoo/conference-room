import React, { Component } from 'react'
import './App.css'

import { Route, Switch, BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import rootReducer from './reducers/index'
import rootSaga from './sagas/sagas'
import createSagaMiddleware from 'redux-saga'

import MainContainer from './components/MainContainer'
import NotFound from './components/NotFound'

const sagaMiddleware = createSagaMiddleware()

let store = createStore(
	rootReducer,
	applyMiddleware(sagaMiddleware)
)
sagaMiddleware.run(rootSaga)

class App extends Component {
  render() {
		return (
			<Provider store={store}>
				<BrowserRouter>
					<Switch>
						<Route exact path="/" component={MainContainer} />
						<Route component={NotFound} />
					</Switch>
				</BrowserRouter>
			</Provider>
		);
  }
}

export default App;
