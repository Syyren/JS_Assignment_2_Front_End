import { useParams, Link } from 'react-router-dom';
import Layout from "../components/Layout";
import { getContact } from '../controllers/ContactController';

export default function ContactDelete()
{
    const { contactID, slug } = useParams();

    return(
        <Layout>
            <h2 className="display-4 mb-4">Contact Delete Page</h2>
        </Layout> 
    )
}