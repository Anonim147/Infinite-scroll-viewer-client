import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ToastProvider } from 'react-toast-notifications';

const httpLink = createHttpLink({
  uri:'http://localhost:4000'
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
})

ReactDOM.render(
  <React.StrictMode>

    <ApolloProvider client={client}>
    <BrowserRouter>
    <ToastProvider
    autoDismiss
    autoDismissTimeout={3000}
    placement="bottom-right"
  >
      <App />
      </ToastProvider>
    </BrowserRouter>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
