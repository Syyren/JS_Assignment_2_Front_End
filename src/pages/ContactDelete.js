import { useParams, Link } from 'react-router-dom';
import Layout from "../components/Layout";
import { getContact } from '../controllers/ContactController';
import { useEffect, useState } from 'react';
import { delContact } from '../controllers/ContactController';

export default function ContactDelete()
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

    const handleSubmit = (event) =>
    {
        event.preventDefault();
    }

    return(
        <Layout>
            <h2 className="display-4 mb-4">Contact Delete Page</h2>
            {loading ? (
                <p>Loading...</p>
            ) : contact && contact.contactID > 0 ? (
                <>
                    <h2>Delete {contact.fName} {contact.lName}?</h2>
                    <div>
                        <button type="submit" className="btn btn-outline-danger me-2">Delete</button>
                        <Link className="btn btn-outline-secondary me-2" to={'/contact/details/'+contactID+'/'+slug}>Back</Link>
                    </div>
                </>
            ) : (
                <div>
                    <p>Contact not found.</p>
                    <Link className="btn btn-outline-secondary me-2" to='/contacts'>Back</Link>
                </div>
            )}
        </Layout> 
    )
}