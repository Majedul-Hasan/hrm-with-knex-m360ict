import otpEmailWorker from './workers/mailWorkers';

import { attachFailureHandler } from './handleJobFailure';

attachFailureHandler([otpEmailWorker]);

console.log('✅ Failure handlers attached');
