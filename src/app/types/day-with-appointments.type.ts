import { Appointment } from './appointment.type';
export type DayWithAppointments = {
    date: Date;
    appointments: Array<Appointment>;
}