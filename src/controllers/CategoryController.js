import { fetchCategories } from '../service/ApiService'

//function that pulls all categories from the database through the ApiService layer
export const getCategories = async () => 
{
    try 
    {
      const contacts = await fetchCategories();
      console.log("Categories from API:", contacts);
      return contacts.map(category => //returns a list of categories with their attributes tied to values
      ({ 
        categoryID: category.categoryID, 
        categoryName: category.categoryName
      }));
    } 
    catch (error) 
    {
      console.error('Error fetching categories:', error); //outputs in the event of an error fetching the categories
      return [];
    }
};