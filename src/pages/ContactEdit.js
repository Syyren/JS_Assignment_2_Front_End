import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from "../components/Layout";
import { getContact } from '../controllers/ContactController';
import { getCategories } from '../controllers/CategoryController';
import { addContact, editContact } from '../controllers/ContactController';
import { useNavigate } from 'react-router-dom';

export default function ContactEdit() 
{
    const { action, contactID, slug } = useParams(); //retrieve the action, contactID and slug parameters from the URL
    const [contact, setContact] = useState([]); //setting the contact data and all the forma data
    const [fName, setFName] = useState('');
    const [lName, setLName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [categoryID, setCategoryID] = useState('');
    const [organization, setOrganization] = useState('');
    const [categories, setCategories] = useState([]);
    const [formErrors, setFormErrors] = useState({}); //error handling states
    const [loading, setLoading] = useState(true); //loading states
    const navigate = useNavigate();

    useEffect(() => 
    {
        //grabbing the categories to place in the drop down menu
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
        //calling the fetchCategoriesData function
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

    //on button click this will trigger to submit the form
    const handleSubmit = async (event) => 
    {
        event.preventDefault();
        //performing form validation
        const errors = {};
        if (!fName.trim()) 
        {
            errors.fName = "Please enter a first name.";
        }
        if (!lName.trim()) 
        {
            errors.lName = "Please enter a last name.";
        }
        if (!phone.trim()) 
        {
            errors.phone = "Please enter a phone number.";
        }
        if (!email.trim()) 
        {
            errors.email = "Please enter an email address.";
        } 
        else if (!/\S+@\S+\.\S+/.test(email)) 
        {
            errors.email = "Entered email is invalid. Please enter a valid email address.";
        }
        if (!categoryID) 
        {
            errors.categoryID = "Please select a category.";
        }

        setFormErrors(errors);
        //if there are no errors, execute the form submission.
        if (Object.keys(errors).length === 0) 
        {
            try
            {
                //making the new data to be fed through
                const updatedContact = {
                    ...contact,
                    fName: fName,
                    lName: lName,
                    phone: phone,
                    email: email,
                    categoryID: categoryID,
                    organization: organization
                };
                console.log(action + 'ing contact:', updatedContact);
                //calling the appropriate function based off the action
                action === 'add' ? await addContact(updatedContact) : await editContact(contactID, updatedContact);
                navigate('/home');
            }
            catch(err)
            {
                console.error("Error submitting form:", err);
            }
        }
    };

    return ( //checks if the action was add or edit and then renders the page accordingly after loading.
        <Layout>
            <h2 className="display-4 mb-4 text-center">
                {action === 'add' ? 'Add Contact' : 'Edit Contact'}
            </h2>
            {loading ? (
                <p>Loading...</p>
            ) : action === 'add' || (contact && contact.contactID > 0) ? (
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>First Name:</label>
                    <input 
                    type="text" 
                    value={fName} 
                    onChange={(e) => setFName(e.target.value)} 
                    className="form-control"
                    />
                    {formErrors.fName && <div className="text-danger">{formErrors.fName}</div>}
                </div>
                <div className="form-group">
                    <label>Last Name:</label>
                    <input 
                    type="text" value={lName} 
                    onChange={(e) => setLName(e.target.value)} 
                    className="form-control" 
                    />
                    {formErrors.lName && <div className="text-danger">{formErrors.lName}</div>}
                </div>
                <div className="form-group">
                    <label>Phone:</label>
                    <input 
                    type="text" 
                    value={phone} 
                    onChange={(e) => setPhone(e.target.value)} 
                    className="form-control" 
                    />
                    {formErrors.phone && <div className="text-danger">{formErrors.phone}</div>}
                </div>
                <div className="form-group">
                    <label>Email:</label>
                    <input
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    className="form-control"
                    />
                    {formErrors.email && <div className="text-danger">{formErrors.email}</div>}
                </div>
                <div className="form-group">
                    <label>Category:</label>
                    <select 
                    value={categoryID} 
                    onChange={(e) => setCategoryID(e.target.value)} 
                    className="form-control"
                    >
                        <option value="">Select Category</option>
                        {categories.map(category => (
                            <option key={category.categoryID} value={category.categoryID}>{category.categoryName}</option>
                        ))}
                    </select>
                    {formErrors.categoryID && <div className="text-danger">{formErrors.categoryID}</div>}
                </div>
                <div className="form-group mb-3">
                    <label>Organization:</label>
                    <input 
                    type="text" 
                    value={organization} 
                    onChange={(e) => setOrganization(e.target.value)} 
                    className="form-control" 
                    />
                    {formErrors.organization && <div className="text-danger">{formErrors.organization}</div>}
                </div>
                <button type="submit" className="btn btn-outline-primary me-2">{action === 'add' ? 'Add Contact' : 'Save Contact'}</button>
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