import React, { useState, useEffect } from 'react';
import { Container, Row } from 'reactstrap';
import { NavLink } from 'react-router-dom'; // Ensure this is imported from react-router-dom
import userIcon from '../assets/images/user-icon.png';
import '../styles/admin-nav.css';
import { useNavigate } from 'react-router-dom'; // Use navigate for redirection
import { signOut } from 'firebase/auth';
import { auth } from '../firebase.config'; // Ensure the correct firebase config path
import { toast } from 'react-toastify';

const adminNav = [
  {
    display: 'Dashboard',
    path: '/dashboard'
  },
  {
    display: 'Add-products',
    path: '/dashboard/add-products'
  },
  {
    display: 'All-Products',
    path: '/dashboard/all-products'
  },
  {
    display: 'Users',
    path: '/dashboard/users'
  },
];

const AdminNav = () => {
  const [profileMenuVisible, setProfileMenuVisible] = useState(false);
  const navigate = useNavigate();

  // Toggle profile menu visibility
  const handleProfileClick = () => {
    setProfileMenuVisible(!profileMenuVisible);
  };

  // Logout functionality
  const logout = () => {
    signOut(auth)
      .then(() => {
        toast.success('Successfully Logged out');
        navigate('/home'); // Redirect to the home page
      })
      .catch((err) => {
        toast.error(err.message); // Display error if sign-out fails
      });
  };

  // Close profile menu if clicked outside
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
    <>
      <header className="admin__header">
        <div className="admin__nav-top">
          <Container>
            <div className="admin__nav-wrapper-top">
              <div className="logo">
                <h2>Furniture Galore</h2>
              </div>

              <div className="search__box">
                <input type="text" placeholder="Search....." />
                <span><i className="ri-search-line"></i></span>
              </div>
              <div className="admin__nav-top-right">
                <span><i className="ri-notification-3-line"></i></span>
                <span><i className="ri-settings-2-line"></i></span>
                <div className="profile" onClick={handleProfileClick}>
                  <img src={userIcon} alt="User icon" />
                  {profileMenuVisible && (
                    <div className="profile_actions">
                      <div>
                        <NavLink to="/dashboard">Dashboard</NavLink>
                        <NavLink to="/profile">Profile</NavLink>
                        <span onClick={logout}>Logout</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Container>
        </div>
      </header>

      <section className="admin__menu p-0">
        <Container>
          <Row>
            <div className="admin_navigation">
              <ul className="admin__menu-list">
                {adminNav.map((item, index) => (
                  <li className="admin__menu-item" key={index}>
                    <NavLink 
                      to={item.path} 
                      className={({ isActive }) => isActive ? 'active_admin-menu' : ''}
                    >
                      {item.display}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default AdminNav;
