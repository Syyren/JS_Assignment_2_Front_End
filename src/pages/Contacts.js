import Layout from "../components/Layout";
import React, { useState, useEffect } from 'react';
import { getContacts } from "../controllers/ContactController";

const Contacts = () => {
    const [contacts, setContacts] = useState([]);
  
    useEffect(() => {
      const fetchAndSetContacts = async () => {
        const contacts = await getContacts();
        setContacts(contacts);
      };
      fetchAndSetContacts();
    }, []);
    
    return(
        <Layout>
            <h2 className="display-4 mb-4">Contacts Page</h2>
            <ul>
                {contacts.map(contact => (
                <li key={contact.id}>{contact.fName}</li>
                ))}
            </ul>
        </Layout> 
    )
}

export default Contacts;