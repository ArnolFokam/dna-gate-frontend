import register from 'src/pages/register/register.reducer';
import authentication from './authentication.reducer';
import metrics from './metrics.reducer';
import apikey from './api-key.reducer';

const rootReducer = {
  apikey,
  authentication,
  register,
  metrics,
};

export default rootReducer;
