const API_URL = 'http://localhost:8000'; //setting the api url

export const fetchContacts = async () => 
{
  const response = await fetch(`${API_URL}/contacts/view/all`);
  return response.json();
};