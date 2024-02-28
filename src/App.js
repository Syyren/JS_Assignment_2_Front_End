import { BrowserRouter, Routes, Route} from 'react-router-dom'
import About from './pages/About'
import ContactDelete from './pages/ContactDelete'
import ContactDetails from './pages/ContactDetails'
import ContactEdit from './pages/ContactEdit'
import Contacts from './pages/Contacts'
import Home from './pages/Home'
import NoPage from './pages/NoPage'

export default function App() {
  return 
  (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element={ <Home /> } />
          <Route path="/home" element={ <Home /> } />
          <Route path="/about" element={ <About /> } />
          <Route path="/contacts" element={ <Contacts /> } />
          <Route path="/contact/details" element={ <ContactDetails /> } />
          <Route path="/contact/delete" element={ <ContactDelete /> } />
          <Route path="/contact/edit" element={ <ContactEdit /> } />
          <Route path="*" element={ <NoPage /> } />
        </Routes>
      </BrowserRouter>
    </div>
  );
};