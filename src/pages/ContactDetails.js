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
    const [categories, setCategories] = useState([]);

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
        const fetchCategoriesData = async () =>
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
        fetchContactDetails();
        fetchCategoriesData();
    }, [contactID, slug]);

    //grabs the category name via it's id
    const getCategoryName = (categoryId) => 
    {
      const category = categories.find(cat => cat.categoryID === categoryId);
      return category ? category.categoryName : 'NA'; //if category name can't be found returns NA
    };

    console.log("Contact", contact);
    console.log("Contact Length", contact);

    return(
        <Layout>
            <h2 className="display-4 mb-4 text-center">Contact Details Page</h2>
            <br />
            {loading ? (
                <p className="text-center">Loading...</p>
            ) : contact && contact.contactID > 0 ? (
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-6">
                            <div className="text-center p-4 border rounded">
                                <p><strong>Name:</strong><br />{contact.fName} {contact.lName}</p>
                                <p><strong>Phone:</strong><br />{contact.phone}</p>
                                <p><strong>Email:</strong><br />{contact.email}</p>
                                <p><strong>Category:</strong><br />{getCategoryName(contact.categoryID)}</p>
                                <p><strong>Organization:</strong><br />{contact.organization}</p>
                                <p className='mb-4'><strong>Date Added:</strong><br />{contact.dateCreated}</p>
                                <div>
                                    <Link 
                                    className="btn btn-outline-primary me-2"
                                    to={'/contact/edit/'+contact.contactID+'/'+slug}>
                                        Edit
                                    </Link>
                                    <Link 
                                    className="btn btn-outline-danger me-2" 
                                    to={'/contact/delete/'+contact.contactID+'/'+slug}>
                                        Delete
                                    </Link>
                                    <Link 
                                    className="btn btn-outline-secondary me-2" 
                                    to='/contacts'>
                                        Back
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <p className="text-center">Contact not found</p>
            )}
        </Layout>
    )
}