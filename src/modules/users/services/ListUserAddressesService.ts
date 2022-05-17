import axios from 'axios';
import NodeCache from 'node-cache';
import { Addresses } from '../types';

export interface Request {
  addressId: string;
  street: string;
  number: number;
  country: string;
  city: string;
  state: string;
  zipcode: string;
}

const endpointCache = new NodeCache();

export class ListUserAddressesService {
  public async execute(userId: string): Promise<Addresses[]> {
    try {
      const apiURL = `https://${process.env.HOST_PARAM}.mockapi.io/api/v1/users/${userId}/address`;

      if (endpointCache.has(apiURL)) {
        return endpointCache.get(apiURL) as Addresses[];
      } else {
        const { data } = await axios.get(apiURL);

        let addressIdCont = 1;
        let userAddresses: Addresses[] = [];

        data.map((addresses: Request) => {
          addresses.addressId = String(addressIdCont);
          addressIdCont++;

          let { addressId, street, number, country, city, state, zipcode } =
            addresses;

          userAddresses.push({
            addressId,
            address: street + ', ' + number,
            country,
            city,
            state,
            zipcode,
          });
        });

        endpointCache.set(apiURL, userAddresses);

        return userAddresses;
      }
    } catch (error) {
      return [];
    }
  }
}
