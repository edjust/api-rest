import { getMongoRepository, MongoRepository } from 'typeorm';
import { Users } from '../schemas/Users';
import { IUsersRepository } from '../../../repositories/IUsersRepository';
import { IInsertUsersDTO } from '../../../dtos/IInsertUsersDTO';

export class UsersRepository implements IUsersRepository {
  private ormRepository: MongoRepository<Users>;

  constructor() {
    this.ormRepository = getMongoRepository(Users, 'mongo');
  }

  public async insert({
    fullName,
    email,
    address,
    addressNumber,
    phoneNumber,
  }: IInsertUsersDTO): Promise<Users> {
    const user = this.ormRepository.create({
      fullName,
      email,
      address,
      addressNumber,
      phoneNumber,
    });

    await this.ormRepository.save(user);

    return user;
  }
}
