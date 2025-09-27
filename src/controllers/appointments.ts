import { FastifyRequest, FastifyReply } from "fastify";
import { Appointment, create, findAll, findById, remove, update } from "../models/appointments";
import { hasProps } from "../utils/hasProps";

export async function createAppointment(req: FastifyRequest,res: FastifyReply) {
    const data = req.body as Appointment;
    if(!hasProps(data, ['type', 'date', 'time'])) return res.status(400).send({success: false, message: 'Preencha todos os dados!'});

    try {
    const appointment = await create(data);
    
    if(!appointment) throw new Error("Falha ao realizar agendamento");

    return res.status(201).send({success: true, message: "Agendamento realizado com sucesso!"});

    } catch (error) {
        return res.status(500).send({success: false, message: `Erro: ${error}`})
    }

}

export async function getAppointments(req: FastifyRequest, res: FastifyReply) {
    try {
      const appointments = await findAll();
      return res.status(200).send({ success: true, data: appointments });
    } catch (error) {
      return res.status(500).send({ success: false, message: `Erro ao buscar agendamentos: ${error}` });
    }
  }

  export async function getAppointmentById(req: FastifyRequest, res: FastifyReply) {
    const { id } = req.params as { id: string };
  
    try {
      const appointment = await findById(id);
      if (!appointment) return res.status(404).send({ success: false, message: 'Agendamento não encontrado' });
  
      return res.send({ success: true, data: appointment });
    } catch (error) {
      return res.status(500).send({ success: false, message: `Erro: ${error}` });
    }
  }

  export async function updateAppointment(req: FastifyRequest, res: FastifyReply) {
    const { id } = req.params as { id: string };
    const data = req.body as Partial<Appointment>;
  
    try {
      const updated = await update(id, data);
      return res.status(200).send({ success: true, message: 'Agendamento atualizado', data: updated });
    } catch (error) {
      return res.status(500).send({ success: false, message: `Erro: ${error}` });
    }
  }

  export async function deleteAppointment(req: FastifyRequest, res: FastifyReply) {
    const { id } = req.params as { id: string };
  
    try {
      const deleted = await remove(id);
      return res.status(200).send({ success: true, message: 'Agendamento excluído com sucesso', data: deleted });
    } catch (error) {
      return res.status(500).send({ success: false, message: `Erro: ${error}` });
    }
  }