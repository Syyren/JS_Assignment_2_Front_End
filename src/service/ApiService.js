const API_URL = 'http://localhost:3000/api'; //getting the api url

export const fetchContacts = async () => {
  const response = await fetch(`${API_URL}/contacts`);
  return response.json();
};