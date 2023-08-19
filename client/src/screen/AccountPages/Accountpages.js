import { useEffect, useState } from "react";
import { Card, Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { update } from "../../actions/useraction";
import ErrorMessage from "../../components/ErrorMessage";
import Loading from "../../components/Loading";
import MainScreen from "../../components/MainScreen";

import Button from '@mui/material/Button';

const AccountPages = () => {
  const [username, setUsername] = useState("");
  const userLogin = useSelector((state) => state.userLogin);
  const userUpdate = useSelector((state) => state.userUpdate);
  const { userInfo } = userLogin;
  const { loading, error, success } = userUpdate;
  const navigate = useNavigate();
  useEffect(() => {
    if (userInfo) {
      setUsername(userInfo.username);
    }
    else {
      navigate("/");
    }
  }, [userInfo, navigate]);
  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(update(userInfo._id, username));
  };
  return (
    <MainScreen title={"Welcome " + userInfo.username}>
      {loading && <Loading />}
      <Card
        border="primary"
        style={{
          width: "70%", marginLeft: "auto", marginRight: "auto",
          borderTopLeftRadius: "1px",
          borderTopRightRadius: "1px",
          borderBottomRightRadius: "1px",
          fontFamily: "Roboto"
        }}
      >
        <Card.Header>Profile</Card.Header>
        <Card.Body>
          <Card.Title style={{
            fontFamily: "Roboto",
            fontWeight: "500"
          }}>About you</Card.Title>
          <Card.Text>
            <Form onSubmit={submitHandler}>
              <Form.Group
                as={Row}
                className="mb-3"
                controlId="formHorizontalEmail"
              >
                <Form.Label column sm={2}>
                  Email
                </Form.Label>
                <Col sm={10}>
                  <Form.Control type="email" value={userInfo.email} disabled
                    style={{
                      borderTopLeftRadius: "1px",
                      borderTopRightRadius: "1px",
                      borderBottomRightRadius: "1px",
                      borderBottomLeftRadius: "1px",
                      fontFamily: "Roboto"
                    }}
                  />
                </Col>
              </Form.Group>

              <Form.Group
                as={Row}
                className="mb-3"
                controlId="formHorizontalPassword"
              >
                <Form.Label column sm={2}>
                  Username
                </Form.Label>
                <Col sm={10}>
                  <Form.Control
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    style={{
                      borderTopLeftRadius: "1px",
                      borderTopRightRadius: "1px",
                      borderBottomRightRadius: "1px",
                      borderBottomLeftRadius: "1px",
                      fontFamily: "Roboto"
                    }}
                  />
                </Col>
              </Form.Group>
              <Button
                variant="contained"
                type="submit"
                style={{
                  marginBottom: "10px",
                  float: "right",
                }}
              >
                Save your profile
              </Button>
            </Form>
          </Card.Text>
        </Card.Body>
      </Card>
    </MainScreen>
  );
};

export default AccountPages;
