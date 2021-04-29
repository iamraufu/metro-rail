import './DestinationTimeline.css'
import React from 'react';
import { Col, Container, Image, Row } from 'react-bootstrap';
import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineDot from '@material-ui/lab/TimelineDot';

const DestinationTimeline = () => {
     
      return (
            <div>
                  <Container>
                        <Row>
                              <Col className='timeline'>
                              <div className="timeline-container">

                                    <Timeline>
                                          <TimelineItem>
                                                <TimelineSeparator>
                                                      <TimelineDot />
                                                      <TimelineConnector />
                                                </TimelineSeparator>
                                                <TimelineContent>Mirpur</TimelineContent>
                                          </TimelineItem>
                                          <TimelineItem>
                                                <TimelineSeparator>
                                                      <TimelineDot />
                                                </TimelineSeparator>
                                                <TimelineContent>Dhanmondi</TimelineContent>
                                          </TimelineItem>
                                    </Timeline>
                              </div>

                              <div className="tickets">
                                    <img style={{width:'10%'}}src="https://i.ibb.co/cJhdpbH/tickets-3.png" alt=""/>
                              <h3 className="ticket"> Ticket 1</h3>
                              <h3>$67</h3>
                              </div>
                              <div className="tickets">
                              <img style={{width:'10%'}}src="https://i.ibb.co/cJhdpbH/tickets-3.png" alt=""/>
                              <h3 className="ticket">Ticket 2</h3>
                              <h3>$67</h3>
                              </div>
                              <div className="tickets">
                              <img style={{width:'10%'}}src="https://i.ibb.co/cJhdpbH/tickets-3.png" alt=""/>
                              <h3 className="ticket">Ticket 3</h3>
                              <h3>$67</h3>
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

export default DestinationTimeline;