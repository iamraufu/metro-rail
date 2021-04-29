import './Destination.css';
import React, { useContext } from 'react';
import { Col, Container, Image, Row } from 'react-bootstrap';
import { UserContext } from '../../App';
import { useHistory} from 'react-router';

const Destination = () => {

      const [loggedInUser, setLoggedInUser] = useContext(UserContext);
      const history = useHistory();
     
      return (
            <div>
                  <h2>Welcome {loggedInUser.name}</h2>
                        <Container>
                              <Row>
                                    <Col>
                                          <div className="search-container">
                                                <form >
                                                      <h5 style={{ margin: '10px 0 0 15px', textAlign: 'left' }}>Pick From</h5>
                                                      <input style={{ marginTop: '10px', width: '90%' }} type="text" placeholder='Sylhet' />

                                                      <h5 style={{ margin: '10px 0 0 15px', textAlign: 'left' }}>Pick To</h5>
                                                      <input style={{ marginTop: '10px', width: '90%' }} type="text" placeholder='Dhaka' />

                                                      <button style={{ marginTop: '20px', border: 'none' }} onClick={()=>{history.push("/destinationtimeline")}} className='submit-btn' type="submit">Search</button>

                                                </form>
                                          </div>
                                    </Col>
                                    <Col>
                                          <div id="map">
                                                <Image src="https://i.ibb.co/2gB4hxf/image-6.png" fluid />
                                          </div>

                                    </Col>
                              </Row>

                        </Container>
            </div>
      );
};

export default Destination;