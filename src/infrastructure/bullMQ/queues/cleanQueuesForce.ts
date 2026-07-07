import { otpQueueEmail } from './mailQueues';

async function cleanQueuesForce() {
  console.log('🔥 Force removing all jobs...');

  await Promise.all([otpQueueEmail.obliterate({ force: true })]);

  console.log('✅ All queues completely removed');
}

(async () => {
  try {
    await cleanQueuesForce();
    process.exit(0);
  } catch (err) {
    console.error('❌ Error:', err);
    process.exit(1);
  }
})();
