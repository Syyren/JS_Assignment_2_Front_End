import NavBar from './NavBar'
import Footer from './Footer'
import Header from './Header'

//This method allows me to easily make a layout for each page to follow
const Layout = ({ children }) => {
  return ( //within the 'main' section, the page is rendered
    <>
        <Header />
        <NavBar />
        <main>{children}</main>
        <Footer />
    </>
  )
}

export default Layout