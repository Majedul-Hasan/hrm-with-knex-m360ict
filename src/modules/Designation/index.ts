import { DesignationRepository } from './designation.repository';
import { DesignationService } from './designation.service';
import { DesignationController } from './designation.controller';
import { createDesignationRoutes } from './designation.routes';

const repository = new DesignationRepository();

const service = new DesignationService(repository);

const controller = new DesignationController(service);

export const designationRoutes = createDesignationRoutes(controller);
