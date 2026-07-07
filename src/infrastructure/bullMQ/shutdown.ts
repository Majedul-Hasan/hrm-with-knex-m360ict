import { Worker, Queue } from 'bullmq';

const workers: Worker[] = [];
const queues: Queue[] = [];

export const registerWorker = (worker: Worker) => {
  workers.push(worker);
};

export const registerQueue = (queue: Queue) => {
  queues.push(queue);
};

export const gracefulShutdown = async () => {
  console.log('🚨 Gracefully shutting down...');

  await Promise.all([...workers.map(w => w.close()), ...queues.map(q => q.close())]);

  console.log('✅ All queues & workers closed');
  process.exit(0);
};
