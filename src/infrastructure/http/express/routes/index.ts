import { AuthRoutes } from '@modules/auth/auth.routes';
import { RoleRoutes } from '@modules/hr/role/role.routes';
import { permissionsRoutes } from '@modules/hr/permission/permission.routes';
import { Router } from 'express';
import { ProductBrandRoutes } from '@modules/inventory/productBrand/productBrand.routes';
import { CategoryRoutes } from '@modules/inventory/productCategory/productCategory.routes';

type ModuleRoute = {
  path: string;
  route: Router;
};

const router = Router();

const moduleRoutes: ModuleRoute[] = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/hr/role',
    route: RoleRoutes,
  },
  {
    path: '/hr/permissions',
    route: permissionsRoutes,
  },
  {
    path: '/inventory/brand',
    route: ProductBrandRoutes,
  },
  {
    path: '/inventory/category',
    route: CategoryRoutes,
  },
];
moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
