import { toast } from 'react-toastify';
import { isFulfilledAction, isRejectedAction } from 'src/reducers/utils';

const addErrorAlert = (message, key?, data?) => {
  toast.error(message);
};

const notificationMiddleware = () => next => action => {
  const { error, payload } = action;

  /**
   *
   * The notification middleware serves to add success and error notifications
   */
  if (isFulfilledAction(action) && payload && payload.headers) {
    const headers = payload?.headers;
    let alert: string | null = null;
    headers &&
      Object.entries<string>(headers).forEach(([k, v]) => {
        if (k.toLowerCase().endsWith('app-alert')) {
          alert = v;
        }
      });
    if (alert) {
      toast.success(alert);
    }
  }

  if (isRejectedAction(action) && error && error.isAxiosError) {
    if (error.response) {
      const response = error.response;
      const data = response.data;
      if (
        !(
          response.status === 401 &&
          (error.message === '' || (data && data.path && (data.path.includes('/users/me') || data.path.includes('/api/authenticate'))))
        )
      ) {
        switch (response.status) {
          // connection refused, server not reachable
          case 0:
            addErrorAlert('Server not reachable', 'error.server.not.reachable');
            break;

          case 400: {
            let errorHeader: string | null = null;
            let entityKey: string | null = null;
            response?.headers &&
              Object.entries<string>(response.headers).forEach(([k, v]) => {
                if (k.toLowerCase().endsWith('app-error')) {
                  errorHeader = v;
                } else if (k.toLowerCase().endsWith('app-params')) {
                  entityKey = v;
                }
              });
            if (errorHeader) {
              const entityName = entityKey;
              addErrorAlert(errorHeader, errorHeader, { entityName });
            } else if (typeof data === 'string' && data !== '') {
              addErrorAlert(data);
            } else {
              toast.error(data?.detail || data?.message || data?.error || data?.title || 'Unknown error!');
            }
            break;
          }
          case 404:
            addErrorAlert('Not found', 'error.url.not.found');
            break;

          default:
            if (typeof data === 'string' && data !== '') {
              addErrorAlert(data);
            } else {
              toast.error(data?.detail || data?.message || data?.error || data?.title || 'Unknown error!');
            }
        }
      }
    } else if (error.config && error.config.url === 'users/me' && error.config.method === 'get') {
      /* eslint-disable no-console */
      console.log('Authentication Error: Trying to access url users/me with GET.');
    } else {
      toast.error(error.message || 'Unknown error!');
    }
  } else if (error) {
    toast.error(error.message || 'Unknown error!');
  }
  return next(action);
};

export default notificationMiddleware;
