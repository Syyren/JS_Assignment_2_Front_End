import { fetchContacts, fetchContact, createContact, updateContact, deleteContact } from '../service/ApiService'

//method that interfaces with the ApiService layer to get all contacts in the database
export const getContacts = async () => 
{
    try 
    {
      const contacts = await fetchContacts();
      console.log("Contacts from API:", contacts);
      return contacts.map(contact => //returns a list of contacts with all their attributes tied to values
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
    catch (err) 
    {
      console.error('Error fetching contacts:', err);
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
    return contact; //sends back the contact
  }
  catch (err) 
  {
    console.error('Error fetching contact:', err);
    return []; //outputs an error and returns blank if one is caught
  }
}

//method that interfaces witht he ApiService to save a new contact
export const addContact = async (contactData) =>
{
  try
  {
    contactData.dateCreated = Date.now;
    createContact(contactData); //stores the contact through the ApiService
    console.log("Contact added successfully");
  }
  catch(err)
  {
    console.error('Error creating contact:', err) //outputs in the event of an error creating the contact
  }
}

//method that interfaces witht he ApiService to update a contact
export const editContact = async (contactID, contactData) =>
{
  try
  {
    updateContact(contactID, contactData) //updates the contact through the ApiService
    console.log("Contact edited successfully");
  }
  catch(err)
  {
    console.error('Error saving contact:', err) //outputs in the event of an error updating the contact
  }
}

//method that interfaces witht he ApiService to delete a contact
export const delContact = async (contactID) =>
{
  try
  {
    deleteContact(contactID) //deletes the contact through the ApiService
    console.log("Contact deleted successfully");
  }
  catch(err)
  {
    console.error('Error saving contact:', err) //outputs in the event of an error updating the contact
  }
}