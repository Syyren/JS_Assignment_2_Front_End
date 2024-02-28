import React from 'react';
import { Link } from 'react-router-dom'; //importing link so that the navbar can navigate using routes
//this function creates the navbar for the layout and returns it
export default function NavBar() {
  return (
    <nav>
      <ul>
        <li><Link to="/home">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/contacts">Contacts</Link></li>
      </ul>
    </nav>
  );
}