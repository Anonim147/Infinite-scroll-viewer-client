import React from 'react';
import { useReducer } from 'react';
import './App.scss';
import { Route, Switch } from 'react-router';

import MainContent from './components/MainContent';
import Image from './components/Image';
import Header from './components/Header';
import Footer from './components/Footer';

import {
  MainContentContext,
  initialState,
  mainContentReducer
} from './components/MainContent/main-content-reducer';



const App = () => {
  const [state, dispatch] = useReducer(mainContentReducer, initialState);
  return (
    <div className="App">
      <MainContentContext.Provider value={{ dispatch, state }}>
        <Header />
      </MainContentContext.Provider>

      <Switch>
        <Route path='/' render={() =>
          <MainContentContext.Provider value={{ dispatch, state }}>
            <MainContent />
          </MainContentContext.Provider>
        } exact />
        {<Route path='/:id' render={({ match }) => {
          const { id } = match.params;
          return <Image id={id} />;
        }} />}
      </Switch>
      
      <Footer />
    </div>
  );
}

export default App;
