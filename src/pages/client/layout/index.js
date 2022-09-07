import Header from './header';
import Footer from './footer';
function Layout({ children }) {
    return (
        <div className="wrapper">
            <Header />
            <div className="content">{children}</div>
            <Footer />
        </div>
    );
}

export default Layout;
