import { FastifyInstance } from 'fastify';
import {
  createAppointment,
  getAppointments,
  getAppointmentById,
  updateAppointment,
  deleteAppointment,
} from '../controllers/appointments';

export default async function appointmentRoutes(server: FastifyInstance) {
  server.post('/', {preHandler: server.authenticate}, createAppointment);
  server.get('/:brandId', {preHandler: server.authenticate}, getAppointments);
  server.get('/:brandId/:id',{preHandler: server.authenticate}, getAppointmentById);
  server.put('/:id',{preHandler: server.authenticate}, updateAppointment);
  server.delete('/:id',{preHandler: server.authenticate}, deleteAppointment);
}
