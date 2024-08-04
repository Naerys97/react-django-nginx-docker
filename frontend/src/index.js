import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'rsuite/dist/rsuite.min.css'
import './index.css'
import '@fontsource/poppins'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { routes } from "./routes/routes";
import Error404Page from './pages/errors/Error404Page';

const container = document.getElementById('root');
const root = createRoot(container);

const router = createBrowserRouter([
  {
    path: '/',
    element: <App/>,
    children: routes,
    errorElement: <Error404Page/>
  }
])
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
