import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom';
import { store } from './app/store';
import { Provider } from 'react-redux';
import { TagContextHOC } from './context/TagContext';
import {
	LandingPage,
	Export,
	Feed,
	Post,
  Publish,
	Profile,
	Pricing,
	Tags,
  SignIn
} from './screens';
import './index.css';
import reportWebVitals from './reportWebVitals';

const TagContextComponent = (BaseComponent) => {
  const Component = TagContextHOC(BaseComponent);
  return <Component />;
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />,
  },
  {
    path: '/export',
    element: TagContextComponent(Export),
  },
  {
    path: '/feed',
    element: TagContextComponent(Feed),
  },
  {
    path: '/feed/:tag',
    element: TagContextComponent(Feed),
  },
  {
    path: '/post',
    element: TagContextComponent(Post),
  },
  {
    path: '/publish',
    element: TagContextComponent(Publish),
  },
  {
    path: '/profile',
    element: TagContextComponent(Profile),
  },
  {
    path: '/pricing',
    element: TagContextComponent(Pricing),
  },
  {
    path: '/tags',
    element: TagContextComponent(Tags),
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
