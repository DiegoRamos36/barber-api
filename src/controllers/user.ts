import { FastifyRequest, FastifyReply } from 'fastify';
import { hasProps } from '../utils/hasProps'; 
import { create, User } from '../models/users';
import { Role } from '../utils/role';

export async function createUserController(req: FastifyRequest, res: FastifyReply) {
  const data = req.body as User;

  if (!hasProps(data, ['phone', 'password'])) {
    return res.status(400).send({ success: false, message: 'Preencha todos os dados!' });
  }

  const parseData = {
    phone: data.phone,
    password: data.password,
    role: Role.CLIENTE,
    name: data.name
  }

  try {
    const user = await create(parseData);

    if (!user) throw new Error('Falha ao criar usuário');

    return res.status(201).send({ success: true, message: 'Usuário criado com sucesso!', user });
  } catch (error) {
    return res.status(422).send({ success: false, message: `Erro: ${error}` });
  }
}
