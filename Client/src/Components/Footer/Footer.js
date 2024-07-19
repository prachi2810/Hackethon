import "./Footer.css"
import 'font-awesome/css/font-awesome.min.css';
import logo from '../../Images/logo.png'
export default function Footer() {
    return (
        <>
            {/* <section>Footer Example 4</section> */}
            <footer className="footer-distributed">

                <div className="footer-left">
                    <img src={logo} width={'25%'} alt="Logo"/>
                    <p className="footer-links">
                        <a href="#" className="link-1">Home</a>

                        <a href="#">Blog</a>

                        <a href="#">Pricing</a>

                        <a href="#">About</a>

                        <a href="#">FAQ</a>

                        <a href="#">Contact</a>
                    </p>

                    <p className="footer-company-name">Copyright © 2022 Zensar Technologies. All rights reserved.</p>
                </div>

                <div className="footer-center">

                    <div>
                        <i className="fa fa-map-marker"></i>
                        <p><span>Plot #4, MIDC Off Nagar Road, </span>Zensar Knowledge Park, Kharadi, Pune</p>
                    </div>

                    <div>
                        <i className="fa fa-phone"></i>
                        <p>020-66074000</p>
                    </div>

                    {/* <div>
                        <i className="fa fa-envelope"></i>
                        <p><a href="mailto:support@company.com">support@company.com</a></p>
                    </div> */}

                </div>

                <div className="footer-right">

                    <p className="footer-company-about">
                        <span>About the company</span>
                        We are a technology consulting and services company with 10,000 associates in 33 global locations. We focus on on conceptualizing, designing, engineering, marketing and managing digital products.
                    </p>

                    <div className="footer-icons">

                        <a href="https://m.facebook.com/100064703649380"><i className="fa fa-facebook"></i></a>
                        <a href="https://twitter.com/Zensar?t=aCN3En6tnYDDbAYJDQvnGw&s=09"><i className="fa fa-twitter"></i></a>
                        <a href="https://www.linkedin.com/company/zensar"><i className="fa fa-linkedin"></i></a>
                        <a href="https://m.youtube.com/user/Zennovation"><i className="fa fa-youtube"></i></a>

                    </div>

                </div>

            </footer>
        </>
    )
}