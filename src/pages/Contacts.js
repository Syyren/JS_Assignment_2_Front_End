import Layout from "../components/Layout";
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getContacts } from "../controllers/ContactController";
import { getCategories } from "../controllers/CategoryController";

const Contacts = () => 
{
    const [contacts, setContacts] = useState([]);
    useEffect(() => 
    {
        async function fetchContactsData() 
        {
          try
          {
            const contactsData = await getContacts();
            setContacts(contactsData);
          }
          catch(err)
          {
            console.error("Error fetching contact data:", err)
          }
        }
        fetchContactsData();
    }, []);
    
    const [categories, setCategories] = useState([]);
    useEffect(() => 
    {
        async function fetchCategoriesData() 
        {
          try
          {
            const categoriesData = await getCategories();
            setCategories(categoriesData);
          }
          catch(err)
          {
            console.error("Error fetching category data:", err)
          }
        }
        fetchCategoriesData();
    }, []);

    const getCategoryName = (categoryId) => 
    {
      const category = categories.find(cat => cat.categoryID === categoryId);
      return category ? category.categoryName : 'NA';
    };

    return(
        <Layout>
            <h2 className="display-4 mb-4">Contacts Page</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">First Name</th>
                        <th scope="col">Last Name</th>
                        <th scope="col">Phone</th>
                        <th scope="col">Email</th>
                        <th scope="col">Category</th>
                        <th scope="col">Organization</th>
                    </tr>
                </thead>
                <tbody>
                    {contacts.map(contact => (
                        <tr key={contact.contactID}>
                            <td><Link to={'/contact/details/'+contact.contactID+contact.slug}>{contact.fName}</Link></td>
                            <td><Link to={'/contact/details/'+contact.contactID+contact.slug}>{contact.lName}</Link></td>
                            <td>{contact.phone}</td>
                            <td>{contact.email}</td>
                            <td>{getCategoryName(contact.categoryID)}</td>
                            <td>{contact.organization}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Layout> 
    )
}

export default Contacts;