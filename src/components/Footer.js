import React from 'react';

const Footer = ({ navigate }) => {
    const handleNavClick = (path) => (e) => {
        e.preventDefault();
        if(navigate) {
            navigate(path);
        } else {
            window.location.href = path;
        }
    };

    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-column">
                    <h3 className="footer-title">UrbanJewels</h3>
                    <p>Curated jewellery for modern elegance.</p>
                </div>
                <div className="footer-column">
                    <h3 className="footer-title">Shop</h3>
                    <a href="/rings" className="footer-link" onClick={handleNavClick('/rings')}>Rings</a>
                    <a href="/earrings" className="footer-link" onClick={handleNavClick('/earrings')}>Earrings</a>
                    <a href="/bracelet" className="footer-link" onClick={handleNavClick('/bracelet')}>Bracelet</a>
                    <a href="/mangalsutra" className="footer-link" onClick={handleNavClick('/mangalsutra')}>Mangalsutra</a>
                </div>
                <div className="footer-column">
                    <h3 className="footer-title">About</h3>
                    <a href="#" className="footer-link">Our Story</a>
                    <a href="#" className="footer-link">Contact</a>
                    <a href="#" className="footer-link">FAQs</a>
                </div>
                <div className="footer-column">
                    <h3 className="footer-title">Follow Us</h3>
                    <a href="#" className="footer-link">Instagram</a>
                    <a href="#" className="footer-link">Pinterest</a>
                    <a href="#" className="footer-link">Facebook</a>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; {new Date().getFullYear()} UrbanJewels. All Rights Reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;