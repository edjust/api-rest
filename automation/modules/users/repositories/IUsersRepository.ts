import { Users } from '../infra/typeorm/schemas/Users';
import { IInsertUsersDTO } from '../dtos/IInsertUsersDTO';

export interface IUsersRepository {
  insert(data: IInsertUsersDTO): Promise<Users>;
}
