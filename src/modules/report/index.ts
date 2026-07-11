import { ReportController } from './report.controller';
import { ReportRepository } from './report.repository';
import { createReportRoutes } from './report.routes';
import { ReportService } from './report.service';

const repository = new ReportRepository();
const service = new ReportService(repository);
const controller = new ReportController(service);
export const reportRoutes = createReportRoutes(controller);
