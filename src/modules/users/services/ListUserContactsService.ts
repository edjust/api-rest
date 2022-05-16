import axios from 'axios';

export interface Contacts {
  contactId: string;
  name: string;
  phoneNumber: string;
  email: string;
}

export class ListUserContactsService {
  public async execute(userId: number): Promise<Contacts[]> {
    const apiURL = `https://${process.env.HOST_PARAM}.mockapi.io/api/v1/users/${userId}/contacts`;

    const { data } = await axios.get(apiURL);

    let contactIdCont = 1;
    let userContacts: Contacts[] = [];

    data.map((contact: Contacts) => {
      contact.contactId = String(contactIdCont);
      contactIdCont++;
      let { contactId, name, phoneNumber, email } = contact;
      userContacts.push({ contactId, name, phoneNumber, email });
    });

    return userContacts;
  }
}
