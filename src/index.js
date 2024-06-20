import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom';
import { store } from './app/store';
import { Provider } from 'react-redux';
import {
	LandingPage,
	Export,
	Feed,
	Post,
	Profile,
	Pricing,
	Topic,
  SignIn
} from './screens';
import './index.css';
import reportWebVitals from './reportWebVitals';

const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />,
  },
  {
    path: '/export',
    element: <Export />,
  },
  {
    path: '/feed',
    element: <Feed />,
  },
  {
    path: '/post',
    element: <Post />,
  },
  {
    path: '/profile',
    element: <Profile />,
  },
  {
    path: '/pricing',
    element: <Pricing />,
  },
  {
    path: '/topic',
    element: <Topic />,
  },
  {
    path: '/signin',
    element: <SignIn />,
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
