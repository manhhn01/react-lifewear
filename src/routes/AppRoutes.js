import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation, useRoutes } from 'react-router-dom';
import DefaultLayout from '../layouts/DefaultLayout';
import Cart from '../pages/Cart';
import Category from '../pages/Category';
import CategoryDetail from '../pages/Category/CategoryDetail';
import Checkout from '../pages/Checkout';
import Home from '../pages/Home';
import ProductDetail from '../pages/ProductDetail';
import Register from '../pages/Register';
import Info from '../pages/User/Info';
import Addresses from '../pages/User/Info/Addresses';
import Notification from '../pages/User/Info/Notifcation';
import Orders from '../pages/User/Info/Orders';
import UpdateInfo from '../pages/User/Info/UpdateInfo';
import Login from '../pages/User/Login';

const AppRoutes = () => {
  const auth = useSelector((state) => state.auth.logged);
  const location = useLocation();

  const routes = [
    {
      element: <DefaultLayout />,
      children: [
        {
          path: '/:slug',
          element: <ProductDetail />,
        },
        {
          path: '/collections',
          element: <Category />,
        },
        {
          path: '/collections/:slug',
          element: <CategoryDetail />,
        },
        {
          path: '/hang-moi',
          element: <CategoryDetail />,
        },
        {
          path: '/cart',
          element: <Cart />,
        },
        // {
        // todo
        //   path: '/wishlist',
        //   element: <Wishlist />,
        // },
        {
          path: '/user/login',
          element: auth ? (
            <Navigate to={location.state?.previous || '/'} replace />
          ) : (
            <Login />
          ),
        },
        {
          path: '/user/register',
          element: auth ? (
            <Navigate to={location.state?.previous || '/'} replace />
          ) : (
            <Register />
          ),
        },
        {
          path: '/user',
          element: auth ? (
            <Info />
          ) : (
            <Navigate
              to="/user/login"
              state={{ previous: location.pathname }}
            />
          ),
          children: [
            {
              path: '',
              element: <UpdateInfo />,
            },
            {
              path: 'orders',
              element: <Orders />,
            },
            {
              path: 'addresses',
              element: <Addresses />,
            },
            {
              path: 'notifications',
              element: <Notification />,
            },
          ],
        },
      ],
    },
    {
      element: <DefaultLayout transparentHeader />,
      children: [
        {
          path: '/',
          element: <Home />,
        },
      ],
    },
    {
      element: <DefaultLayout noFooter />,
      children: [
        {
          path: '/checkout',
          element: <Checkout />,
        },
      ],
    },
  ];

  let routesElement = useRoutes([...routes]);
  return routesElement;
};

export default AppRoutes;
