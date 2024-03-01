import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from "../components/Layout";
import { getContact } from '../controllers/ContactController';
import { getCategories } from '../controllers/CategoryController';

export default function ContactDetails()
{
    const { contactID, slug } = useParams();
    const [contact, setContact] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => 
    {
        const fetchContactDetails = async () => 
        {
            try 
            {
                const contactDetails = await getContact(contactID, slug);
                //fetching contact details using the contactID and slug as validation
                setContact(contactDetails);
                setLoading(false);
            } 
            catch (err) 
            {
                console.error('Error fetching contact details:', err);
            }
        };

        fetchContactDetails();
    }, [contactID, slug]);

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

    console.log("Contact", contact);
    console.log("Contact Length", contact);

    return(
        <Layout>
            <h2 className="display-4 mb-4">Contact Details Page</h2>
            <br />
            {loading ? (
                <p>Loading...</p>
            ) : contact && contact.contactID > 0 ? (
                <div>
                    <p>Name: {contact.fName} {contact.lName}</p>
                    <p>Phone: {contact.phone}</p>
                    <p>Email: {contact.email}</p>
                    <p>Category: {getCategoryName(contact.categoryID)}</p>
                    <p>Organization: {contact.organization}</p>
                    <p>Date Added: {contact.dateCreated}</p>
                    <div>
                        <Link className="btn btn-outline-primary me-2" to={'/contact/edit/'+contact.contactID+'/'+slug}>Edit</Link>
                        <Link className="btn btn-outline-danger me-2" to={'/contact/delete/'+contact.contactID+'/'+slug}>Delete</Link>
                        <Link className="btn btn-outline-secondary me-2" to='/contacts'>Back</Link>
                    </div>
                </div>
            ) : (
                <p>No data found.</p>
            )}
        </Layout>
    )
}