import Layout from "../components/Layout";
import React, { useState, useEffect } from 'react';
import { getContacts } from "../controllers/ContactController";

const Contacts = () => 
{
    const [contacts, setContacts] = useState([]);

    useEffect(() => 
    {
        async function fetchContactsData() 
        {
          try
          {
            const contactsData = await getContacts();
            setContacts(contactsData);
          }
          catch(err)
          {
            console.error("Error fetching contact data:", err)
          }
        }
        fetchContactsData();
    }, []);

    console.log("Contacts:", contacts);
    
    return(
        <Layout>
            <h2 className="display-4 mb-4">Contacts Page</h2>
            <table>
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Phone</th>
                        <th>Email</th>
                        <th>Category</th>
                        <th>Organization</th>
                    </tr>
                </thead>
                <tbody>
                    {contacts.map(contact => (
                        <tr key={contact.contactID}>
                            <td>{contact.fName}</td>
                            <td>{contact.lName}</td>
                            <td>{contact.phone}</td>
                            <td>{contact.email}</td>
                            <td>{contact.categoryID}</td>
                            <td>{contact.organization}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Layout> 
    )
}

export default Contacts;