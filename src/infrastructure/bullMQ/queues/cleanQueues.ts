import { otpQueueEmail } from './mailQueues';

export async function cleanQueues() {
  await Promise.all([
    otpQueueEmail.clean(0, 1000, 'completed'),
    otpQueueEmail.clean(0, 1000, 'failed'),
    otpQueueEmail.clean(0, 1000, 'delayed'),
    otpQueueEmail.clean(0, 1000, 'wait'),
  ]);

  console.log('✅ Queue cleaned');

  // Close Redis connections
  await Promise.all([otpQueueEmail.close()]);
}

(async () => {
  try {
    console.log('Cleaning queues...');
    await cleanQueues();
    process.exit(0);
  } catch (err) {
    console.error('❌ Error cleaning queues:', err);
    process.exit(1);
  }
})();
