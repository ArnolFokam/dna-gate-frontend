import register from 'src/pages/register/register.reducer';
import authentication from './authentication.reducer';
import biometrics from 'src/pages/biometric-infos/biometric-infos.reducer';
import metrics from './metrics.reducer';
import apikey from './api-key.reducer';

const rootReducer = {
  apikey,
  authentication,
  register,
  metrics,
  biometrics
};

export default rootReducer;
