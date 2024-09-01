import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { useDispatch, useSelector } from 'react-redux';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
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
  Payment,
  Subscriptions,
  ActiveSubscriptions
} from './screens/subscriptions';
import {
	LandingPage,
	Export,
	Feed,
	Post,
  Publish,
	Profile,
	Tags,
  Tag,
  PostDetails,
  Subscribers,
  Founders,
  SignIn
} from './screens/general';
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
              const {
                email,
                admin,
                photoUrl,
                displayName,
                activeSubscriptions,
                freeTrial,
                credit
              } = node[userId]
              resolve({
                loggedIn: true,
                userId,
                email,
                admin,
                photoUrl,
                displayName,
                activeSubscriptions,
                freeTrial,
                credit
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

const stripePromise = loadStripe(process.env.REACT_APP_PUBLISHABLE_KEY);

const TagContextComponent = (BaseComponent) => {
  const Component = TagContextHOC(BaseComponent);

  return <ProtectedRoute>
      <Elements stripe={stripePromise}>
        <Component />
      </Elements>
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
    element: TagContextComponent(PostDetails),
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
    path: '/subscriptions',
    element: TagContextComponent(Subscriptions),
  },
  {
    path: '/subscriptions/active-subscriptions',
    element: TagContextComponent(ActiveSubscriptions),
  },
  {
    path: '/subscriptions/payment',
    element: TagContextComponent(Payment),
  },
  {
    path: '/tags',
    element: TagContextComponent(Tags),
  },
  {
    path: '/subscribers',
    element: TagContextComponent(Subscribers),
  },
  {
    path: '/founders',
    element: TagContextComponent(Founders),
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
