import 'reflect-metadata';
import axios from 'axios';
import './database';
import { IUsersRepository } from './modules/users/repositories/IUsersRepository';
import { UsersRepository } from './modules/users/infra/typeorm/repositories/UsersRepository';

interface Request {
  fullName: string;
  email: string;
  addresses: [{ address: string; addressNumber: number }];
  contacts: [{ phoneNumber: string }];
}

const api = 'http://localhost:4000/users';

async function index() {
  let { data } = await axios.get(api);

  const usersRepository: IUsersRepository = new UsersRepository();

  data.map(async (users: Request) => {
    let { fullName, email, addresses, contacts } = users;

    await usersRepository.insert({
      fullName,
      email,
      address: addresses[0] ? addresses[0].address.split(',')[0] : '',
      addressNumber: addresses[0]
        ? Number(addresses[0].address.split(',')[1])
        : '',
      phoneNumber: contacts[0].phoneNumber,
    });
  });
}

index();
