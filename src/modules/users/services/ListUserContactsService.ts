import axios from 'axios';
import NodeCache from 'node-cache';

export interface Contacts {
  contactId: string;
  name: string;
  phoneNumber: string;
  email: string;
}

const endpointCache = new NodeCache();

export class ListUserContactsService {
  public async execute(userId: string): Promise<Contacts[]> {
    try {
      const apiURL = `https://${process.env.HOST_PARAM}.mockapi.io/api/v1/users/${userId}/contacts`;

      if (endpointCache.has(apiURL)) {
        return endpointCache.get(apiURL) as Contacts[];
      } else {
        const { data } = await axios.get(apiURL);

        let contactIdCont = 1;
        let userContacts: Contacts[] = [];

        data.map((contact: Contacts) => {
          contact.contactId = String(contactIdCont);
          contactIdCont++;
          let { contactId, name, phoneNumber, email } = contact;
          userContacts.push({ contactId, name, phoneNumber, email });
        });

        endpointCache.set(apiURL, userContacts);

        return userContacts;
      }
    } catch (error) {
      return [];
    }
  }
}
