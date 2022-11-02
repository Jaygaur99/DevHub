import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import App from './App';

import { Provider } from 'react-redux';
import { store } from './store/store';

import { ChakraProvider } from '@chakra-ui/react';
import theme from './customTheme';

import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

const queryClient = new QueryClient();

const container = document.getElementById('root');
if (!container) throw new Error('Failed to find the root element');
const root = ReactDOM.createRoot(container);

root.render(
    // <React.StrictMode>
    <ChakraProvider resetCSS={true} theme={theme}>
        <QueryClientProvider client={queryClient}>
            <Provider store={store}>
                <Toaster position="top-right" reverseOrder={false} />
                <Router>
                    <App />
                </Router>
            </Provider>
            <ReactQueryDevtools />
        </QueryClientProvider>
    </ChakraProvider>,
    // </React.StrictMode>,
);
