import { LazyExoticComponent, Suspense, lazy } from 'react';
import { Navigate } from 'react-router-dom';
import { RouteObject } from 'react-router';

import SidebarLayout from './layouts/SidebarLayout';
import BaseLayout from './layouts/BaseLayout';

import SuspenseLoader from './components/SuspenseLoader';
import HeaderSearch from './layouts/SidebarLayout/Header/Buttons/Search/HeaderSearch';
import SignIn from './components/Login/SignIn';
import PrivateRoute from './auth/PrivateRoute';
import { JSX } from 'react/jsx-runtime';
import Status404 from './content/pages/Status/Status404';
import Status500 from './content/pages/Status/Status500';
import StatusMaintenance from './content/pages/Status/Maintenance';
import StatusComingSoon from './content/pages/Status/ComingSoon';
import DashboardCrypto from './content/dashboards/Crypto';
import ApplicationsTransactions from './content/applications/Transactions';


const routes: RouteObject[] = [
  {
    path: '',
    element: <BaseLayout />,
    children: [
      {
        path: 'status',
        children: [
          {
            path: '',
            element: <Navigate to="404" replace />
          },
          {
            path: '404',
            element: <Status404 />
          },
          {
            path: '500',
            element: <Status500 />
          },
          {
            path: 'maintenance',
            element: <StatusMaintenance />
          },
          {
            path: 'coming-soon',
            element: <StatusComingSoon />
          }
        ]
      },
      {
        path: '*',
        element: <Status404 />
      }
    ]
  },
  {
    path: 'dashboards',
    element: <PrivateRoute />,
    children: [
      {
        path: '',
        element: <SidebarLayout />,

        children: [
          { path: '', element: <Navigate to="crypto" replace /> },
          { path: 'crypto', element: <DashboardCrypto /> }
        ]
      }
    ]
  },
  {
    path: 'management',
    element: <PrivateRoute />,
    children: [
      {
        path: '',
        element: <SidebarLayout />,
        children: [
          { path: '', element: <Navigate to="transactions" replace /> },
          { path: 'transactions', element: <ApplicationsTransactions /> }
        ]
      }
    ]
  },

  {
    path: 'search',
    element: <HeaderSearch></HeaderSearch>
  },
  {
    path: 'SignIn',
    element: <SignIn></SignIn>
  }
];

export default routes;
