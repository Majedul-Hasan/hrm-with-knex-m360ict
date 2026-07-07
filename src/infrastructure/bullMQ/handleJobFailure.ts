import { Worker } from 'bullmq';
import logger from '../logging/logger';

export const attachFailureHandler = (workers: Worker[]) => {
  const handleJobFailure = async (job: any, err: any) => {
    logger.error(`❌ Job ${job?.id} failed`, { err });
  };

  workers.forEach(w => w.on('failed', handleJobFailure));
};
