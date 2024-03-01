import Layout from "../components/Layout";
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getContacts } from "../controllers/ContactController";
import { getCategories } from "../controllers/CategoryController";

const Contacts = () => 
{
    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(true);
    //using useEffect to gather the contacts data
    useEffect(() => 
    {
        async function fetchContactsData() 
        {
          try
          {
            const contactsData = await getContacts();
            setContacts(contactsData);
            setLoading(false); //finishes loading and triggers the flag
          }
          catch(err)
          {
            console.error("Error fetching contact data:", err)
          }
        }
        fetchContactsData();
    }, []);
    
    const [categories, setCategories] = useState([]);
    //using useEffect to gather the categories data
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
            <h2 className="display-4 mb-4 text-center">Contacts Page</h2>
            <Link className="btn btn-outline-primary me-2" to='/contact/add'>Add a Contact</Link>
            {loading ? (
                <p>Loading...</p>
            ) : (
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
                            <td><Link 
                            className="btn btn-outline-primary me-2" 
                            style={{width: '100%'}} 
                            to={'/contact/details/'+contact.contactID+contact.slug}>
                              {contact.fName}
                            </Link></td>
                            <td><Link 
                            className="btn btn-outline-primary me-2"
                            style={{width: '100%'}}
                            to={'/contact/details/'+contact.contactID+contact.slug}>
                              {contact.lName}
                            </Link></td>
                            <td>{contact.phone}</td>
                            <td>{contact.email}</td>
                            <td>{getCategoryName(contact.categoryID)}</td>
                            <td>{contact.organization}</td>
                        </tr>
                    ))}
                </tbody>
            </table> 
            )}
        </Layout> 
    )
}

export default Contacts;