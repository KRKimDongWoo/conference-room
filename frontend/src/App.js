import React, { Component } from 'react'
import './App.css'

import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import rootReducer from './reducers/index'
import rootSaga from './sagas/sagas'
import createSagaMiddleware from 'redux-saga'

import MainContainer from './components/mainContainer'

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
				<MainContainer />
			</Provider>
		);
  }
}

export default App;
