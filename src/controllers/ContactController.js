import { fetchContacts } from '../service/ApiService'

export const getContacts = async () => {
    try {
      const contacts = await fetchContacts();
      return contacts.map(contact => ({ id: contact.id, fName: contact.fName, lName: contact.lName }));
    } 
    catch (error) {
      console.error('Error fetching contacts:', error);
      return [];
    }
  };