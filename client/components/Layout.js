import { UserProvider } from '../context'
import Navbar from './Navbar'
import Footer from './Footer'

const Layout = ({ children }) => {
    return (
        <UserProvider>
            <Navbar />
                {children}
            <Footer />
        </UserProvider>
    )
}

export default Layout
