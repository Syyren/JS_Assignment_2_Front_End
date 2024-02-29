import { fetchCategories } from '../service/ApiService'

export const getCategories = async () => 
{
    try 
    {
      const contacts = await fetchCategories();
      console.log("Categories from API:", contacts);
      return contacts.map(category => 
      ({ 
        categoryID: category.categoryID, 
        categoryName: category.categoryName
      }));
    } 
    catch (error) 
    {
      console.error('Error fetching categories:', error);
      return [];
    }
};