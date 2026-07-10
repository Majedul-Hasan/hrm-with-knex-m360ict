import { AttendanceRepository } from './attendance.repository';
import {
  Attendance,
  AttendanceInStatus,
  AttendanceOutStatus,
  CreateAttendanceDto,
  ListAttendanceFilter,
  UpdateAttendanceDto,
} from './attendance.types';
import { NotFoundError } from '@shared/errors';
import { TMeta } from '@infra/http/express/utils/sendResponse';
import { calculateTotalHour, getInTimeStatus, getOutTimeStatus } from './attendance.utils';

export class AttendanceService {
  constructor(private readonly attendanceRepository: AttendanceRepository) {}

  async create(payload: CreateAttendanceDto): Promise<Attendance> {
    const existing = await this.attendanceRepository.findByEmployeeAndDate(payload.employeeId, payload.attendanceDate);
    let totalHour;
    let outTimeStatus;
    if (payload.checkOutTime) {
      totalHour = calculateTotalHour(payload.checkInTime, payload.checkOutTime);
      outTimeStatus = getOutTimeStatus(payload.checkOutTime);
    }

    const inTimeStatus = getInTimeStatus(payload.checkInTime);
    if (existing) {
      console.log(payload);
      return this.attendanceRepository.update(existing.id, {
        checkInTime: payload.checkInTime as any,
        checkOutTime: payload.checkOutTime as any,
        comment: payload.comment,
        totalHour: totalHour,
        inTimeStatus: inTimeStatus,
        outTimeStatus: outTimeStatus,
        ip: payload.ip,
        punchBy: payload.punchBy,
      });
    }

    return this.attendanceRepository.create({
      ...payload,
      totalHour,
      inTimeStatus,
      outTimeStatus,
    } as Partial<Attendance>);
  }

  async update(id: number, payload: UpdateAttendanceDto): Promise<Attendance> {
    const attendance = await this.getById(id);

    if (!attendance) throw new NotFoundError('Attendance');

    const checkInTime = payload.checkInTime ?? attendance.checkInTime;
    const checkOutTime = payload.checkOutTime ?? attendance.checkOutTime;

    const updatePayload: Partial<Attendance> = {
      ...payload,
    };

    if (checkInTime) {
      updatePayload.inTimeStatus = getInTimeStatus(checkInTime);
    }

    if (checkOutTime) {
      updatePayload.outTimeStatus = getOutTimeStatus(checkOutTime);
    }

    if (checkInTime && checkOutTime) {
      updatePayload.totalHour = calculateTotalHour(checkInTime, checkOutTime);
    }

    return this.attendanceRepository.update(id, updatePayload);
  }

  async delete(id: number): Promise<number> {
    return this.attendanceRepository.delete(id);
  }

  async getById(id: number): Promise<Attendance | undefined> {
    const attendance = await this.attendanceRepository.findById(id);

    if (!attendance) {
      throw new NotFoundError('attendance');
    }
    return attendance;
  }

  async list(filter: ListAttendanceFilter): Promise<Attendance[]> {
    return this.attendanceRepository.list(filter);
  }

  async count(filter: ListAttendanceFilter): Promise<TMeta> {
    const total = await this.attendanceRepository.count(filter);
    return {
      page: filter.page,
      limit: filter.limit,
      totalPage: Math.ceil(total / filter.limit),

      total,
    };
  }
}
