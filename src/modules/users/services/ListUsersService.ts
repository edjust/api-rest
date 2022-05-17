import axios from 'axios';
import NodeCache from 'node-cache';
import { QueryParams, Users } from '../types';

interface Request {
  id: string;
  createdAt: string;
  firstName: string;
  lastName: string;
  email: string;
}

const endpointCache = new NodeCache();

export class ListUsersService {
  public async execute(queryParams: QueryParams): Promise<Users[]> {
    const apiURL = new URL(
      `https://${process.env.HOST_PARAM}.mockapi.io/api/v1/users`,
    );

    const { page, limit, sortBy, order } = queryParams;

    page ? apiURL.searchParams.append('page', String(page)) : '';
    limit ? apiURL.searchParams.append('limit', String(limit)) : '';
    sortBy ? apiURL.searchParams.append('sortBy', sortBy) : '';
    order ? apiURL.searchParams.append('order', order) : '';

    if (endpointCache.has(apiURL.href)) {
      return endpointCache.get(apiURL.href) as Users[];
    } else {
      const { data } = await axios.get(apiURL.href);
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

      endpointCache.set(apiURL.href, usersList);

      return usersList;
    }
  }
}
