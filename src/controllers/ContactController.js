import { fetchContacts, fetchContact } from '../service/ApiService'

//method that interfaces with the ApiService layer to get all contacts in the database
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

//method that interfaces with the ApiService layer to get a contact from the database
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
  catch (err) 
  {
    console.error('Error fetching contact:', err);
    return [];
  }
}

//method that interfaces witht he ApiService to save a new contact
export const createContact = async () =>
{
  try
  {
    console.log("Blank");
  }
  catch(err)
  {
    console.error('Error saving contact:', err)
  }
}

//method that interfaces witht he ApiService to update a contact
export const updateContact = async (contactID) =>
{
  try
  {
    console.log("Blank");
  }
  catch(err)
  {
    console.error('Error saving contact:', err)
  }
}

//method that interfaces witht he ApiService to delete a contact
export const deleteContact = async (contactID) =>
{
  try
  {
    console.log("Blank");
  }
  catch(err)
  {
    console.error('Error saving contact:', err)
  }
}