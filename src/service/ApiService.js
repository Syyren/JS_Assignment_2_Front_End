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

//function that deletes a contact from the database
export const deleteContact = async (contactID) => 
{
  const response = await fetch(`${API_URL}/contacts/del/${contactID}`, {
    method: 'DELETE'
  });
  //checking if the deletion went through properly
  if (!response.ok) 
  {
    throw new Error('Failed to delete contact');
  }
  console.log('Contact deleted successfully.');
};

//function that returns all categories in the database
export const fetchCategories = async () => 
{
  const response = await fetch(`${API_URL}/categories/view/all`);
  return response.json();
};