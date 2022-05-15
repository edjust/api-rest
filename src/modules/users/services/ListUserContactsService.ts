import axios from 'axios';

export class ListUserContactsService {
  public async execute(userId: number): Promise<[]> {
    const apiURL = `https://${process.env.HOST_PARAM}.mockapi.io/api/v1/users/${userId}/contacts`;

    const { data } = await axios.get(apiURL);
    const userContacts = data;

    return userContacts;
  }
}
