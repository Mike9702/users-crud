
import './App.css'
import { Col, Container, Navbar, Row, Spinner, Toast } from 'react-bootstrap'
import UsersForm from './components/UsersForm'
import UsersList from './components/UsersList'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { BASE_URL } from './constants/Users'

function App() {

  const [users, setUsers] = useState([]);
  const [notification, setNotification] = useState({ message: "", variant: "success", show: false })
  const [isLoading, setIsLoading] = useState(true);
  const [userSelected, setUserSelected] = useState(null);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = () => {
    // endpoint GET -> /songs
    axios.get(BASE_URL + "/users/")
      .then(res => setUsers(res.data))
      .finally(() => setIsLoading(false));
  }


  const showSuccessNotf = (message) => {
    setNotification({ message, variant: "success", show: true })
  }

  const showFailNotf = (message) => {
    setNotification({
      message: message ? message : 'There was an error',
      variant: "danger",
      show: true
    })
  }

  const selectUser = toDo => setUserSelected(toDo);
  const deselectUser = () => setUserSelected(null);

  return (
    <>
      <Navbar className="nav" variant="dark">
        <Container style={{ maxWidth: 900 }}>
          <Navbar.Brand href="#home">
            Users crud
          </Navbar.Brand>
        </Container>
      </Navbar>
      <Container className="mt-2" style={{ maxWidth: 900 }}>
        <Spinner className={`ms-auto d-block ${!isLoading && 'invisible'}`} />
        <UsersForm
          getUsers={getUsers}
          showSuccessNotf={showSuccessNotf}
          showFailNotf={showFailNotf}
          setIsLoading={setIsLoading}
          userSelected={userSelected}
          deselectUser={deselectUser}
        />
        <UsersList
          users={users}
          getUsers={getUsers}
          showSuccessNotf={showSuccessNotf}
          showFailNotf={showFailNotf}
          setIsLoading={setIsLoading}
          selectUser={selectUser}
        />
      </Container>
      <Container style={{ position: 'fixed', bottom: '40px', left: 0, right: 0 }}>
        <Toast
          onClose={() => setNotification({ ...notification, show: false })}
          position="bottom-start"
          show={notification.show}
          bg={notification.variant}
          delay={3000}
          className="text-light"
          autohide
        >
          <Toast.Body>{notification.message}</Toast.Body>
        </Toast>
      </Container>
    </>
  )
}

export default App
