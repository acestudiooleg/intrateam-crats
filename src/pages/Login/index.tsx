import * as React from 'react';
import { useDispatch } from 'react-redux';

import { Card, CardBody, CardTitle, Container, Row, Form, FormGroup, Label, Input, Button, Col } from 'reactstrap';

import Layout from '../../containers/Layout';
import { login } from '../../actions/auth';

const Login = (): React.ReactElement => {

  const dispatch = useDispatch();

  const [form, setForm] = React.useState({
    email: 'e@mail.com',
    password: '123',
  });

  const handleInput = (name: string) => ({ target: { value } }: React.ChangeEvent<HTMLInputElement>): void =>
    setForm({ ...form, [name]: value });

  const submitForm = (e: React.SyntheticEvent<HTMLFormElement>): void => {
    e.preventDefault();
    dispatch(login(form));
  };

  return (
    <Layout>
      <Container>
        <Row>
          <Col>
            <Card>
              <h1>You will be redirected to Google....</h1>
              <CardBody>
                <CardTitle className="mb-4 mt-1">Sign in</CardTitle>
                <Form onSubmit={submitForm}>
                  <FormGroup>
                    <Label>Your email</Label>
                    <Input onChange={handleInput('email')} value={form.email} placeholder="Email" type="email" />
                  </FormGroup>
                  <FormGroup>
                    <Label>Your password</Label>
                    <Input
                      onChange={handleInput('password')}
                      value={form.password}
                      placeholder="******"
                      type="password"
                    />
                  </FormGroup>
                  <FormGroup>
                    <Button type="submit" block color="primary">
                      Login
                    </Button>
                  </FormGroup>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default Login;
