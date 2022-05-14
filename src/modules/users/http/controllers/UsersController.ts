import { Request, Response } from 'express';
import axios from 'axios';

export class FindAllUsersController {
  public async index(request: Request, response: Response) {
    const apiURL = `https://${process.env.HOST_PARAM}.mockapi.io/api/v1/users`;

    const usersList = await axios.get(apiURL);

    return response.json(usersList.data);
  }
}
