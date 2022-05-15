import axios from 'axios';

interface Request {
  id: number;
  contacts: [];
  addresses: [];
}

export class ListUsersService {
  public async execute(): Promise<Request[]> {
    const apiURL = `https://${process.env.HOST_PARAM}.mockapi.io/api/v1/users`;

    const { data } = await axios.get(apiURL);
    const usersList = data;

    return usersList;
  }
}
