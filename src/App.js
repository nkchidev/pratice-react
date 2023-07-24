import './App.scss';
import Header from './component/Header';
import Home from './component/Home';
import TableUsers from './component/TableUsers';
import Container from 'react-bootstrap/Container';
import { ToastContainer } from 'react-toastify';
import { Routes, Route } from "react-router-dom";
import Login from './component/Login';
import { useContext, useEffect } from 'react';
import { UserContext } from './context/UserContext';

function App() {
  const {login} = useContext(UserContext);
  useEffect(() => {
    if(localStorage.getItem("token")){
      login(localStorage.getItem("email", localStorage.getItem("token")));
    }
  }, []);

  return (
    <>
      <div className='app-container'>
        <Header />
        <Container>
          <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/users" element={<TableUsers />} />
              <Route path="/login" element={<Login />} />
          </Routes>
        </Container>

        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </div>
    </>
  );
}

export default App;
