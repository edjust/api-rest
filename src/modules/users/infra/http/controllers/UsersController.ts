import { Request, Response } from 'express';
import { ListUsersService } from '../../../services/ListUsersService';
import { ListUserAddressesService } from '../../../services/ListUserAddressesService';
import { ListUserContactsService } from '../../../services/ListUserContactsService';

export class ListUsersController {
  public async index(request: Request, response: Response) {
    const listUsersService = new ListUsersService();
    const listUserAddressesService = new ListUserAddressesService();
    const listUserContactsService = new ListUserContactsService();

    const usersList = await listUsersService.execute();

    for (let user of usersList) {
      // console.log(user);
      let userAddresses = await listUserAddressesService.execute(user.id);
      let userContacts = await listUserContactsService.execute(user.id);
      // console.log(userAddresses);
      // console.log(userContacts);
      user.addresses = userAddresses;
      user.contacts = userContacts;
    }

    return response.json(usersList);
  }
}
