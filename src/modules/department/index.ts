import { DepartmentRepository } from './department.repository';
import { DepartmentService } from './department.service';
import { DepartmentController } from './department.controller';
import { createDepartmentRoutes } from './department.routes';

const repository = new DepartmentRepository();

const service = new DepartmentService(repository);

const controller = new DepartmentController(service);

export const departmentRoutes = createDepartmentRoutes(controller);
