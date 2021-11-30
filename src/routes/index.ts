import { lazy } from 'react';
import BiometricInfosManagement from 'src/pages/biometric-infos/BiometricInfosManagement';

// use lazy for better code splitting, a.k.a. load faster
const Dashboard = lazy(() => import('src/pages/Dashboard'));
const ApiKeyManagement = lazy(() => import('src/pages/ApiKeyManagement'));

/**
 * ⚠ These are internal routes!
 * They will be rendered inside the app, using the default `containers/Layout`.
 * If you want to add a route to, let's say, a landing page, you should add
 * it to the `App`'s router, exactly like `Login`, `CreateAccount` and other pages
 * are routed.
 *
 * If you're looking for the links rendered in the SidebarContent, go to
 * `routes/sidebar.js`
 */
const routes = [
  {
    path: '/', // the url
    component: Dashboard, // view rendered
  },
  {
    path: '/keys',
    component: ApiKeyManagement,
  },
  {
    path: '/infos',
    component: BiometricInfosManagement,
  }
];

export default routes;
