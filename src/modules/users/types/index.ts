export interface Users {
  id: string;
  createdAt: string;
  fullName: string;
  email: string;
  contacts: Contacts[];
  addresses: Addresses[];
}

export interface QueryParams {
  page: number;
  limit: number;
  sortBy: string;
  order: 'asc' | 'desc';
}

export interface Addresses {
  addressId: string;
  address: string;
  country: string;
  city: string;
  state: string;
  zipcode: string;
}

export interface Contacts {
  contactId: string;
  name: string;
  phoneNumber: string;
  email: string;
}
