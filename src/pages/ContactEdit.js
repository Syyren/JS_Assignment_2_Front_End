import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from "../components/Layout";
import { getContact } from '../controllers/ContactController';
import { getCategories } from '../controllers/CategoryController';

export default function ContactEdit() 
{
    const { action, contactID, slug } = useParams(); //retrieve the action, contactID and slug parameters from the URL
    const [contact, setContact] = useState([]);
    const [fName, setFName] = useState('');
    const [lName, setLName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [categoryID, setCategoryID] = useState('');
    const [organization, setOrganization] = useState('');
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => 
    {
        async function fetchCategoriesData() 
        {
          try
          {
            const categoriesData = await getCategories();
            console.log('categories:',categoriesData);
            setCategories(categoriesData);
          }
          catch(err)
          {
            console.error("Error fetching category data:", err)
          }
        }
        fetchCategoriesData();
        if (action === 'edit') 
        {
            const fetchContactDetails = async () => 
            {
                try 
                {
                    const contactDetails = await getContact(contactID, slug);
                    console.log('contact:',contactDetails);
                    setContact(contactDetails) //setting the contact state and all of the values for the form
                    setFName(contactDetails.fName);
                    setLName(contactDetails.lName);
                    setPhone(contactDetails.phone);
                    setEmail(contactDetails.email);
                    setCategoryID(contactDetails.categoryID);
                    setOrganization(contactDetails.organization);
                    setLoading(false); //setting loading to false to display the form
                } 
                catch (error) 
                {
                    console.error('Error fetching contact details:', error);
                }   
            };
            fetchContactDetails();
        }
        else
        {
            setLoading(false); //sets the loading to false if the action is add
        }
    }, [action, contactID, slug]);

    const handleSubmit = (event) => 
    {
        if (action === 'add')
        {
            console.log("add")
        }
        else
        {
            console.log("edit")
        }
        event.preventDefault();
        // Form submission logic, either add or edit contact
    };

    return ( //checks if the action was add or edit and then renders the page accordingly after loading.
        <Layout>
            <h2 className="display-4 mb-4">
                {action === 'add' ? 'Add Contact' : 'Edit Contact'}
            </h2>
            {loading ? (
                <p>Loading...</p>
            ) : action === 'add' || (contact && contact.contactID > 0) ? (
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>First Name:</label>
                    <input type="text" value={fName} onChange={(e) => setFName(e.target.value)} className="form-control" />
                </div>
                <div className="form-group">
                    <label>Last Name:</label>
                    <input type="text" value={lName} onChange={(e) => setLName(e.target.value)} className="form-control" />
                </div>
                <div className="form-group">
                    <label>Phone:</label>
                    <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} className="form-control" />
                </div>
                <div className="form-group">
                    <label>Email:</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" />
                </div>
                <div className="form-group">
                    <label>Category:</label>
                    <select value={categoryID} onChange={(e) => setCategoryID(e.target.value)} className="form-control">
                        <option value="">Select Category</option>
                        {categories.map(category => (
                            <option key={category.categoryID} value={category.categoryID}>{category.categoryName}</option>
                        ))}
                    </select>
                </div>
                <div className="form-group mb-3">
                    <label>Organization:</label>
                    <input type="text" value={organization} onChange={(e) => setOrganization(e.target.value)} className="form-control" />
                </div>
                <button type="submit" className="btn btn-outline-primary me-2">{action === 'add' ? 'Add' : 'Save'}</button>
                {action === 'add' ? (
                    <Link className="btn btn-outline-secondary me-2" to='/contacts'>Back</Link>
                ) : (
                    <Link className="btn btn-outline-secondary me-2" to={'/contact/details/'+contactID+'/'+slug}>Back</Link>
                )}
            </form>
            ) : (
                <p>Contact not found.</p>
            )}
        </Layout>
    );
}