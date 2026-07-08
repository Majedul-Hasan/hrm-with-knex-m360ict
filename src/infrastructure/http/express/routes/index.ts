import { authRoutes } from '@modules/auth';
import { Router } from 'express';

type ModuleRoute = {
  path: string;
  route: Router;
};

const router = Router();

const moduleRoutes: ModuleRoute[] = [
  {
    path: '/auth',
    route: authRoutes,
  },
  // {
  //   path: '/hr/role',
  //   route: RoleRoutes,
  // },
  // {
  //   path: '/hr/permissions',
  //   route: permissionsRoutes,
  // },
  // {
  //   path: '/inventory/brand',
  //   route: ProductBrandRoutes,
  // },
  // {
  //   path: '/inventory/category',
  //   route: CategoryRoutes,
  // },
];
moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
