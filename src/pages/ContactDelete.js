import { useParams, Link } from 'react-router-dom';
import Layout from "../components/Layout";
import { getContact } from '../controllers/ContactController';
import { useEffect, useState } from 'react';
import { delContact } from '../controllers/ContactController';
import { useNavigate } from 'react-router-dom';

export default function ContactDelete()
{
    const { contactID, slug } = useParams(); //grabbing the ID and slug from the URL
    const [contact, setContact] = useState(null); //establishing contact data
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    
    useEffect(() => 
    {
        //grabbing the contact details to render the page with
        const fetchContactDetails = async () =>
        {
            try
            {
                const contactDetails = await getContact(contactID, slug);
                setContact(contactDetails);
                setLoading(false);
            }
            catch(err)
            {
                console.error('Error fetching contact details:', err);
            }
        };

        fetchContactDetails();
    }, [contactID, slug]);

    //on button click this will trigger and attempt to delete the contact entered
    const handleSubmit = async (event) =>
    {
        try
        {
            await delContact(contact.contactID);
            alert(`${contact.fName} ${contact.lName} deleted successfully!`);
            navigate('/home');
        }
        catch(err)
        {
            console.error("Error deleting Contact:", err);
        }
    }

    return( //body loads before displaying either the delete page or a contact not found message.
        <Layout>
            <h2 className="display-4 mb-4 text-center">Contact Delete Page</h2>
            {loading ? (
                <p>Loading...</p>
            ) : contact && contact.contactID > 0 ? (
                <div className="display-4 mb-4 text-center text-danger">
                    <h2>Delete {contact.fName} {contact.lName}?</h2>
                    <div>
                        <button 
                        onClick={handleSubmit} 
                        className="btn btn-outline-danger me-2">
                            Delete
                        </button>
                        <Link 
                        className="btn btn-outline-secondary me-2" 
                        to={'/contact/details/'+contactID+'/'+slug}>
                            Back
                        </Link>
                    </div>
                </div>
            ) : (
                <div className='text-center'>
                    <p>Contact not found.</p>
                    <Link className="btn btn-outline-secondary me-2" to='/contacts'>Back</Link>
                </div>
            )}
        </Layout> 
    )
}