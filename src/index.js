import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { useDispatch, useSelector } from 'react-redux';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { updateAppState, appState } from './app/appSlice';
import { fbdb } from './app/firebase';
import { ref, query, get, orderByChild, equalTo } from 'firebase/database';
import {
  createBrowserRouter,
  RouterProvider,
  useNavigate
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
  Tag,
  SignIn
} from './screens';
import './index.css';
import reportWebVitals from './reportWebVitals';

const getUserAuthSession = async () => {
  const auth = getAuth();
  let userId = undefined;

  return await new Promise((resolve) => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const { email } = user;
        const userRef = ref(fbdb, 'users/');
        const q = query(userRef, orderByChild('email'), equalTo(email));
        
        get(q)
          .then((snapshot) => {
            const node = snapshot.val();
            if (node !== null) {
              userId = Object.keys(node)[0];
              const { email, photoUrl, displayName } = node[userId]
              resolve({
                loggedIn: true,
                photoUrl,
                displayName,
                email,
                userId
              });
            }
          })
          .catch((error) => {
            console.log('Error:', error);
          });
      }

      if (!user) {
        resolve(undefined);
      }
    });
  })
}

const ProtectedRoute = (props) => {
  const { children } = props;
	const currentAppState = useSelector(appState);
  const { loggedIn } = currentAppState;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const getAuthSess = async () => {
      const resp = await getUserAuthSession();
      if (resp) {
        const newAppState = Object.assign({...currentAppState}, {...resp});
        dispatch(updateAppState(newAppState));
      } else {
        return navigate('/');
      }
    }

    if (!loggedIn) {
      getAuthSess();
    }
  }, [loggedIn])

  return loggedIn ? children : null;
}

const TagContextComponent = (BaseComponent) => {
  const Component = TagContextHOC(BaseComponent);
  return <ProtectedRoute>
      <Component />
    </ProtectedRoute>;
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
    element: TagContextComponent(Tag),
  },
  {
    path: '/feed/:tag/:postid',
    element: TagContextComponent(Tag),
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
