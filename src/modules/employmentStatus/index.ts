import { EmploymentStatusRepository } from './employmentStatus.repository';
import { EmploymentStatusService } from './employmentStatus.service';
import { EmploymentStatusController } from './employmentStatus.controller';
import { createEmploymentStatusRoutes } from './employmentStatus.routes';

const repository = new EmploymentStatusRepository();

const service = new EmploymentStatusService(repository);

const controller = new EmploymentStatusController(service);

export const employmentStatusRoutes = createEmploymentStatusRoutes(controller);
