import React, { useRef, useEffect, useState } from 'react';
import { NavLink, useNavigate, Link } from 'react-router-dom';
import './header.css';
import { Container, Row } from 'reactstrap';
import logo from '../../assets/images/eco-logo.png';
import userIcon from '../../assets/images/user-icon.png';
import { motion } from "framer-motion";
import { useSelector } from 'react-redux';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase.config';
import { toast } from 'react-toastify';

const nav_links = [
    { path: '/home', display: 'Home' },
    { path: '/shop', display: 'Shop' },
    { path: '/cart', display: 'Cart' }
];

const Header = () => {
    const totalQuantity = useSelector(state => state.cart.totalQuantity);
    const headerRef = useRef(null);
    const menuRef = useRef(null);
    const navigate = useNavigate();
    const [profileMenuVisible, setProfileMenuVisible] = useState(false);

    // Sticky header on scroll
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 80) {
                headerRef.current.classList.add('sticky_header');
            } else {
                headerRef.current.classList.remove('sticky_header');
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const menuToggle = () => menuRef.current.classList.toggle('active_menu');
    
    const navigateToCart = () => {
        navigate('/cart');
    };

    const handleProfileClick = () => {
        setProfileMenuVisible(!profileMenuVisible);
    };

    const logout = () => {
        signOut(auth)
            .then(() => {
                toast.success('Succesfully Logged out');
                navigate('/home'); 
            })
            .catch(err => {
                toast.error(err.message); // Display error if sign-out fails
            });
    };

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (profileMenuVisible && !e.target.closest('.profile')) {
                setProfileMenuVisible(false); // Close the profile menu when clicked outside
            }
        };

        document.addEventListener('click', handleClickOutside);
        
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [profileMenuVisible]);

    return (
        <header className="header" ref={headerRef}>
            <Container>
                <Row>
                    <div className="nav__wrapper">
                        <div className="logo">
                            <img src={logo} alt="logo" />
                            <div>
                                <h1>Furniture Galore</h1>
                            </div>
                        </div>

                        <div className="navigation" ref={menuRef} onClick={menuToggle}>
                            <ul className="menu">
                                {nav_links.map((item, index) => (
                                    <li className="nav_item" key={index}>
                                        <NavLink
                                            to={item.path}
                                            className={(navClass) =>
                                                navClass.isActive ? 'nav_active' : ''
                                            }
                                        >
                                            {item.display}
                                        </NavLink>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="nav__icons">
                            <span className="fav_icon"><i className="ri-heart-line"></i>
                                <span className="badge">2</span>
                            </span>

                            <span className="cart_icon" onClick={navigateToCart}><i className="ri-shopping-bag-line"></i>
                                <span className="badge">{totalQuantity}</span>
                            </span>

                            <div className="profile" onClick={handleProfileClick}>
                                <motion.img whileTap={{ scale: 1.2 }} src={userIcon} alt="" />
                                {profileMenuVisible && (
                                    <div className="profile_actions">
                                        <div>
                                            <Link to="/signup">Sign Up</Link>
                                            <Link to="/login">Login</Link>
                                            <Link to="/dashboard">Dashboard</Link>

                                            <span onClick={logout}>Logout</span> {/* Logout button */}
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="mobile_menu">
                                <span onClick={menuToggle}><i className="ri-menu-fill"></i></span>
                            </div>
                        </div>
                    </div>
                </Row>
            </Container>
        </header>
    );
};

export default Header;
