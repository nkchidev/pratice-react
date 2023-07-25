import './App.scss';
import Header from './component/Header';
import Container from 'react-bootstrap/Container';
import { ToastContainer } from 'react-toastify';
import { useContext, useEffect } from 'react';
import { UserContext } from './context/UserContext';
import AppRoutes from './routes/AppRoutes';

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
          <AppRoutes/>
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
