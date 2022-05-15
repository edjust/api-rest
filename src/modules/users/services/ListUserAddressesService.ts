import axios from 'axios';

export class ListUserAddressesService {
  public async execute(userId: number): Promise<[]> {
    const apiURL = `https://${process.env.HOST_PARAM}.mockapi.io/api/v1/users/${userId}/address`;

    const { data } = await axios.get(apiURL, { timeout: 5000 });
    const userAddresses = data;

    return userAddresses;
  }
}
