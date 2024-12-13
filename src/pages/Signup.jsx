import React, { useState } from 'react';
import Helmet from '../components/Helmet/Helmet'; 
import { Container, Row, Col, Form, FormGroup } from 'reactstrap';
import { Link } from 'react-router-dom';
import '../styles/login.css';
import { createUserWithEmailAndPassword} from 'firebase/auth';
import { auth } from '../firebase.config';
import { toast } from 'react-toastify';
import { setDoc, doc } from 'firebase/firestore';
import { db } from '../firebase.config'; // Ensure you import Firestore
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const signup = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

     

      // Save the user data to Firestore
      await setDoc(doc(db, 'user', user.uid), {
        id: user.uid,
        displayName: username,
        email,
        
      });

      toast.success('Account created successfully!');
      setLoading(false);
      navigate('/login');
    } catch (error) {
      toast.error(error.message || 'Something went wrong');
      setLoading(false);
    }
  };

  return (
    <Helmet title="Signup">
      <section>
        <Container>
          <Row>
            {loading ? (
              <Col lg="12" className="text-center">
                <h5 className="fw-bold">Loading...</h5>
              </Col>
            ) : (
              <>
                <Col lg="6" className="mx-auto text-center">
                  <h3 className="fw-bold mb-4">Signup</h3>

                  <Form className="auth_form" onSubmit={signup}>
                    <FormGroup className="form_group">
                      <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                      />
                    </FormGroup>
                    <FormGroup className="form_group">
                      <input
                        type="text"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </FormGroup>

                    <FormGroup className="form_group">
                      <input
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </FormGroup>

                    <button type="submit" className="buy_btn auth_btn">
                      {loading ? 'Creating Account...' : 'Create an Account'}
                    </button>
                    <p>
                      Already have an account? <Link to="/login">Login</Link>
                    </p>
                  </Form>
                </Col>
              </>
            )}
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Signup;
