import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Layout from "../components/Layout";
import { getContact } from '../controllers/ContactController';
import { getCategories } from '../controllers/CategoryController';

export default function ContactDetails()
{
    const [contact, setContact] = useState(null);
    const { contactID } = useParams();

    useEffect(() => 
    {
        const fetchContactDetails = async () => 
        {
            try 
            {
                const contactDetails = await getContact(contactID); //fetching contact details using the contactID
                setContact(contactDetails);
            } 
            catch (error) 
            {
                console.error('Error fetching contact details:', error);
            }
        };

        fetchContactDetails();
    }, [contactID]);

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
            <h2 className="display-4 mb-4">Contact Details Page</h2>
            <br />
            {contact ? (
                <div>
                    <p>Name: {contact.fName} {contact.lName}</p>
                    <p>Phone: {contact.phone}</p>
                    <p>Email: {contact.email}</p>
                    <p>Category: {getCategoryName(contact.categoryID)}</p>
                    <p>Organization: {contact.organization}</p>
                    <p>Date Added: {contact.dateCreated}</p>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </Layout>
    )
}