import { BrowserRouter, Routes, Route} from 'react-router-dom' //importing the react router dom to set my routes
import About from './pages/About'
import ContactDelete from './pages/ContactDelete'
import ContactDetails from './pages/ContactDetails'
import ContactEdit from './pages/ContactEdit'
import Contacts from './pages/Contacts'
import Home from './pages/Home'
import NoPage from './pages/NoPage' //importing each of my pages

export default function App() { //setting the app routes
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element={ <Home /> } />
          <Route path="/home" element={ <Home /> } /> {/* Setting a second home path for clean routing */}
          <Route path="/about" element={ <About /> } />
          <Route path="/contacts" element={ <Contacts /> } />
          <Route path="/contact/details" element={ <ContactDetails /> } />
          <Route path="/contact/delete" element={ <ContactDelete /> } />
          <Route path="/contact/edit" element={ <ContactEdit /> } />
          <Route path="*" element={ <NoPage /> } /> {/* All undefined routes will raise the 404 page here */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}
