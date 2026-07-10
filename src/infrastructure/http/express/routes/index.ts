import { attendanceRoutes } from '@modules/attendance';
import { authRoutes } from '@modules/auth';
import { departmentRoutes } from '@modules/department';
import { designationRoutes } from '@modules/Designation';
import { employmentStatusRoutes } from '@modules/employmentStatus';
import { hrUserRoutes } from '@modules/hr-user';
import { roleRoutes } from '@modules/Role';
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
  {
    path: '/hr/user',
    route: hrUserRoutes,
  },
  {
    path: '/hr/department',
    route: departmentRoutes,
  },
  {
    path: '/hr/role',
    route: roleRoutes,
  },
  {
    path: '/hr/designation',
    route: designationRoutes,
  },
  {
    path: '/hr/employment-status',
    route: employmentStatusRoutes,
  },
  {
    path: '/attendance',
    route: attendanceRoutes,
  },
  // {
  //   path: '/inventory/category',
  //   route: CategoryRoutes,
  // },
];
moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
