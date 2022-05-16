import axios from 'axios';

export interface Request {
  addressId: string;
  street: string;
  number: number;
  country: string;
  city: string;
  state: string;
  zipcode: string;
}

export interface Addresses {
  addressId: string;
  address: string;
  country: string;
  city: string;
  state: string;
  zipcode: string;
}

export class ListUserAddressesService {
  public async execute(userId: number): Promise<Addresses[]> {
    const apiURL = `https://${process.env.HOST_PARAM}.mockapi.io/api/v1/users/${userId}/address`;

    const { data } = await axios.get(apiURL, { timeout: 5000 });

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

    return userAddresses;
  }
}
