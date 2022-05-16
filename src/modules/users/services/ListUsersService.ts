import axios from 'axios';
import { Addresses } from './ListUserAddressesService';
import { Contacts } from './ListUserContactsService';

interface Request {
  id: number;
  contacts: Contacts[];
  addresses: Addresses[];
}

interface QueryParams {
  page: number;
  limit: number;
  sortBy: string;
  order: 'asc' | 'desc';
}

export class ListUsersService {
  public async execute(queryParams: QueryParams): Promise<Request[]> {
    let apiURL = `https://${process.env.HOST_PARAM}.mockapi.io/api/v1/users`;

    let queryParamsLength = Object.keys(queryParams).length;

    const { page, limit, sortBy, order } = queryParams;

    if (page || limit || sortBy || order) {
      apiURL += '?';

      for (let [key, value] of Object.entries(queryParams)) {
        apiURL += `${key}=` + value;

        queryParamsLength--;

        if (queryParamsLength == 0) {
          break;
        } else apiURL += '&';
      }
    }

    const { data } = await axios.get(apiURL);
    const usersList = data;

    return usersList;
  }
}
