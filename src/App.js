import React from 'react';
import './App.scss';
import { Route, Switch } from 'react-router';

import MainContent from './components/MainContent';
import Image from './components/Image';
import Header from './components/Header';
import Footer from './components/Footer';



const App = () => {
  return (
    <div className="App">
      <Header />
      <Switch> 
        <Route path='/' component={MainContent} exact />
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
