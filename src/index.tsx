import 'react-toastify/dist/ReactToastify.min.css';
import 'tippy.js/dist/tippy.css'; 
import './assets/css/tailwind.output.css';

import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import App from './App';
import { Windmill } from '@windmill/react-ui';
import { ToastContainer } from 'react-toastify';

import { SidebarProvider } from './context/SidebarContext';
import getStore from './config/store';
import { bindActionCreators } from 'redux';
import setupAxiosInterceptors from './config/axios-interceptor';
import { clearAuthentication } from './reducers/authentication.reducer';
import ThemedSuspense from './components/ThemedSuspense';
import reportWebVitals from './reportWebVitals';

const store = getStore();

const actions = bindActionCreators({ clearAuthentication }, store.dispatch);
setupAxiosInterceptors(() => actions.clearAuthentication('login.error.unauthorized'));


ReactDOM.render(
  <SidebarProvider>
    <Suspense fallback={<ThemedSuspense />}>
      <Provider store={store}>
        <Windmill usePreferences>
          <App />
          <ToastContainer />
        </Windmill>
      </Provider>
    </Suspense>
  </SidebarProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
