import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router} from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import App from './App';

import { Provider } from 'react-redux';
import { store } from './store/store';

import { ChakraProvider } from '@chakra-ui/react';
import theme from './customTheme';

import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <ChakraProvider resetCSS={true} theme={theme}>
    <QueryClientProvider client={queryClient}>
      {/* <Provider store={store}> */}
        <Toaster position='top-right' reverseOrder={false} />
          <Router>
            <App />
          </Router>
      {/* </Provider> */}
    </QueryClientProvider>
  </ChakraProvider>
);
