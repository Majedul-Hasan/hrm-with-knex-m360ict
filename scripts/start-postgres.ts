import { exec } from 'node:child_process';
import { promisify } from 'node:util';

const execAsync = promisify(exec);

interface Service {
  name: string;
  status: string;
}

async function getPostgresServices(): Promise<Service[]> {
  const command = `powershell -NoProfile -Command "Get-Service | Where-Object { $_.Name -match '^postgresql' } | Select-Object Name,@{Name='Status';Expression={$_.Status.ToString()}} | ConvertTo-Json " `;

  const { stdout } = await execAsync(command);

  if (!stdout.trim()) {
    return [];
  }

  const result = JSON.parse(stdout);

  if (Array.isArray(result)) {
    return result.map(s => ({
      name: s.Name,
      status: s.Status,
    }));
  }

  return [
    {
      name: result.Name,
      status: result.Status,
    },
  ];
}

async function startServicesAsAdmin(services: Service[]) {
  const stopped = services.filter(s => s.status.toLowerCase() === 'stopped');

  if (stopped.length === 0) {
    console.log('✅ All PostgreSQL services are already running.');
    return;
  }

  const script = stopped.map(s => `Start-Service -Name "${s.name}"`).join('; ');

  console.log('\nPowerShell Script:');
  console.log(script);

  const encoded = Buffer.from(script, 'utf16le').toString('base64');

  const command = `powershell -NoProfile -Command "Start-Process PowerShell -Verb RunAs -ArgumentList '-NoProfile -ExecutionPolicy Bypass -EncodedCommand ${encoded}'"`;

  await execAsync(command);

  console.log('\n✅ Start command sent.');
  console.log('Windows may show a UAC confirmation dialog.');
}

async function main() {
  const services = await getPostgresServices();

  if (services.length === 0) {
    console.error('❌ No PostgreSQL service found.');
    process.exit(1);
  }

  console.table(services);

  await startServicesAsAdmin(services);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
