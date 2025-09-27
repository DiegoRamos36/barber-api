import { FastifyRequest, FastifyReply } from 'fastify';
import { hasProps } from '../utils/hasProps'; 
import { create, findByPhoneAndPassword, User } from '../models/users';
import { Role } from '../utils/role';

export async function createUser(req: FastifyRequest, res: FastifyReply) {
  const data = req.body as User;

  if (!hasProps(data, ['phone', 'password', 'name'])) {
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

    return res.status(201).send({ success: true, message: 'Usuário criado com sucesso!' });
  } catch (error) {
    return res.status(422).send({ success: false, message: `Erro: ${error}` });
  }
}

export async function login(req: FastifyRequest, res: FastifyReply) {
    const data = req.body as {phone: string, password: string}

    if(!hasProps(data, ['phone', 'password'])) return res.status(400).send({success: false, message: "Preencha todos os dados!"})

    try {
        const user = await findByPhoneAndPassword(data);
        return res.status(200).send({success:true, data: {name: user.name, role: user.role, phone: user.phone}})
    } catch (error) {
        return res.status(500).send({success: false, message: 'Verifique novamente os dados!'})
    }    
}