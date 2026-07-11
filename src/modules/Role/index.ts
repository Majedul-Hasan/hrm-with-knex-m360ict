import { RoleRepository } from './role.repository';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { createRoleRoutes } from './role.routes';

const repository = new RoleRepository();

const service = new RoleService(repository);

const controller = new RoleController(service);

export const roleRoutes = createRoleRoutes(controller);
