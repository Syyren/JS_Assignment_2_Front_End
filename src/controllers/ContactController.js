import { fetchContacts } from '../service/ApiService'

export const getContacts = async () => 
{
    try 
    {
      const contacts = await fetchContacts();
      console.log("Contacts from API:", contacts);
      return contacts.map(contact => 
      ({ 
        contactID: contact.contactID, 
        fName: contact.fName,
        lName: contact.lName,
        phone: contact.phone,
        email: contact.email,
        categoryID: contact.categoryID,
        organization: contact.organization
      }));
    } 
    catch (error) 
    {
      console.error('Error fetching contacts:', error);
      return [];
    }
};