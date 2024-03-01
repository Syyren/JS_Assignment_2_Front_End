//setting my endpoint URL
const API_URL = 'http://localhost:8000'; //setting the api url

//function that returns all contacts in the database
export const fetchContacts = async () => 
{
  const response = await fetch(`${API_URL}/contacts/view/all`);
  return response.json();
};

//function that fetches a contact via its id from the database
export const fetchContact = async (contactID) => 
{
  const response = await fetch(`${API_URL}/contacts/view/${contactID}`);
  return response.json();
};

//function that creates a new contact in the database
export const createContact = async (contactData) => {
  const response = await fetch(`${API_URL}/contacts/add`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(contactData)
  });
  //checking if the creation went through properly
  if (!response.ok) {
    throw new Error('Failed to create contact');
  }
};

//function that updates a contact in the database
export const updateContact = async (contactID, updatedContactData) => 
{
  const response = await fetch(`${API_URL}/contacts/update/${contactID}`, 
  {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(updatedContactData)
  });
  //checking if the update went through properly
  if (!response.ok) 
  {
    throw new Error('Failed to update contact');
  }
};

//function that deletes a contact from the database
export const deleteContact = async (contactID) => 
{
  const response = await fetch(`${API_URL}/contacts/del/${contactID}`, 
  {
    method: 'DELETE'
  });
  //checking if the deletion went through properly
  if (!response.ok) 
  {
    throw new Error('Failed to delete contact');
  }
};

//function that returns all categories in the database
export const fetchCategories = async () => 
{
  const response = await fetch(`${API_URL}/categories/view/all`);
  return response.json();
};