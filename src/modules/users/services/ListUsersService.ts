import axios from 'axios';
import { Addresses } from './ListUserAddressesService';
import { Contacts } from './ListUserContactsService';

interface Request {
  id: string;
  createdAt: string;
  firstName: string;
  lastName: string;
  email: string;
}

interface Users {
  id: string;
  createdAt: string;
  fullName: string;
  email: string;
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
  public async execute(queryParams: QueryParams): Promise<Users[]> {
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
    let usersList: Users[] = [];

    data.map((addresses: Request) => {
      let { id, createdAt, firstName, lastName, email } = addresses;

      usersList.push({
        id,
        createdAt,
        fullName: firstName + ' ' + lastName,
        email,
        addresses: [],
        contacts: [],
      });
    });

    return usersList;
  }
}
