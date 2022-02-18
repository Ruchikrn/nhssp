import React, { Component } from 'react'
import { Card, CardBody, CardHeader, Row, Col } from 'reactstrap'
import LoginForm from './LoginForm';


class LoginPage extends Component {
  render() {
    return (
      <>

        <Row>
          <Col md={{ size: 6, offset: 3 }}>
            <Card className="mt-4">
              <CardHeader><h4>Login</h4></CardHeader>
              <CardBody>
                <LoginForm />
              </CardBody>
            </Card>

          </Col>
        </Row>
      </>
    );
  }
}

export default LoginPage;