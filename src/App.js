import './App.scss';
import Header from './component/Header';
import Home from './component/Home';
import TableUsers from './component/TableUsers';
import Container from 'react-bootstrap/Container';
import { ToastContainer } from 'react-toastify';
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <div className='app-container'>
        <Header />
        <Container>
          <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/users" element={<TableUsers />} />
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
