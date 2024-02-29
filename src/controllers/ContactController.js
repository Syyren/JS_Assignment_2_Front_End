import { fetchContacts, fetchContact } from '../service/ApiService'

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
        organization: contact.organization,
        dateCreated: contact.dateCreated,
        slug: "/" + contact.fName.split(' ').join('-').toLowerCase() + "-" + contact.lName.split(' ').join('-').toLowerCase()
      }));
    } 
    catch (error) 
    {
      console.error('Error fetching contacts:', error);
      return [];
    }
};

export const getContact = async (contactID, slug) =>
{
  try
  {
    const contact = await fetchContact(contactID);
    let contactSlug = contact.fName.split(' ').join('-').toLowerCase() + "-" + contact.lName.split(' ').join('-').toLowerCase();
    if (contactSlug != slug) throw "slug invalid.";
    console.log("Contact from API:", contact);
    return contact;
  }
  catch (error) 
  {
    console.error('Error fetching contact:', error);
    return [];
  }
}