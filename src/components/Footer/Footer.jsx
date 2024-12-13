import React from 'react'
import './footer.css'
import { Container,Row,Col,ListGroup,ListGroupItem} from 'reactstrap'
import {Link} from 'react-router-dom'



const Footer = () => {

  const  year= new Date().getFullYear()
  return  <footer className="footer">
    <Container>
      <Row>
        <Col lg='4'> 
        <div className="logo">
         
           <div>                                         
          <h1>Furniture Galore</h1>
         </div> 
       </div>  
       <p className="footer__text mt-4">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
             Eius fuga quisquam exercitationem sequi iste. 
             Quisquam eveniet nostrum quo praesentium labore.
          </p>                 
        </Col>

        <Col lg='3'>
        
          <div className="footer__quick-link">
          <h4 className="quick__link-title">Top Categories</h4>
          <ListGroup className='mb-3'>
            <ListGroupItem className='ps-0 border-0 '>
              <Link to ='#'>Pillows</Link>
            </ListGroupItem>
            

            <ListGroupItem  className='ps-0 border-0'>
              <Link to ='#'>Modern Sofa</Link>
            </ListGroupItem>

            
            <ListGroupItem  className='ps-0 border-0'>
              <Link to ='#'>Arm Chair</Link>
            </ListGroupItem>

            
            <ListGroupItem  className='ps-0 border-0'>
              <Link to ='#'>stools</Link>
            </ListGroupItem>

          </ListGroup>
          </div>
         </Col>

        <Col lg='2'>
        <div className="footer__quick-link">
          <h4 className="quick__link-title">Useful Links</h4>
          <ListGroup className='mb-3'>
            <ListGroupItem className='ps-0 border-0'>
              <Link to ='/shop'>Shop</Link>
            </ListGroupItem>
            

            <ListGroupItem  className='ps-0 border-0'>
              <Link to ='/cart'>Cart</Link>
            </ListGroupItem>

            
            <ListGroupItem  className='ps-0 border-0'>
              <Link to ='/login'>Login</Link>
            </ListGroupItem>

            
            <ListGroupItem  className='ps-0 border-0'>
              <Link to ='#'>Privacy </Link>
            </ListGroupItem>

          </ListGroup>
          </div>
        
        </Col>

        <Col lg='3'> 
        <div className="footer__quick-link">
          <h4 className="quick__link-title">Contact</h4>
          <ListGroup className='footer__contact'>
            <ListGroupItem className='ps-0 border-0 d-flex align-items-center gap-2'>
          <span><i className="ri-map-pin-line"></i></span>
          <p>123, Davao city, Philippines</p>
            </ListGroupItem>
            

            <ListGroupItem  className='ps-0 border-0 d-flex align-items-center gap-2'>
            <span><i className="ri-phone-line"></i></span>
            <p>+639614847168</p>
            </ListGroupItem>

            
            <ListGroupItem  className='ps-0 border-0 d-flex align-items-center gap-2'>
            <span><i className="ri-mail-line"></i></span>
          <p>rejay.demerey@hcdc.edu.ph</p>
            </ListGroupItem>

          </ListGroup>
          </div>
        
        </Col>
        <Col lg='12' >
        <p className="footer__copyright">Copyright {year} develop
          by Rejay Demerey. All rights reserved.
        </p>
        </Col>
      </Row>
    </Container>
  </footer>
};  

export default Footer