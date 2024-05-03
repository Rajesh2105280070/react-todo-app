import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Link, Route, Routes, useNavigate } from 'react-router-dom';
import { UserLogin } from './components/user-login';
import { UserRegister } from './components/user-register';
import { UserDashboard } from './components/user-dashboard';
import { UserInvalid } from './components/user-invalid';
import { useCookies } from 'react-cookie';
import { useEffect } from 'react';

function App() {

  const [cookies, setCookie, removeCookie] = useCookies('userid');
  

  useEffect(()=>{
    
  },[]);


  return (
    <div className="container-fluid">
      <div className='bg-shade'>
        <BrowserRouter>
          <header className='text-center p-2'>
            <h1 className='text-white'>TO-DO</h1>
            <p className='text-white'>Your Appointments Organizer</p>
            {
                (cookies['userid']==undefined) ? 
                <div>
                  <Link to='/login' className='btn btn-warning'>Existing User - SignIn</Link>
                  <Link to='/register' className='btn btn-light ms-2'>New User - Register</Link>
                </div>
                : <div className='bg-light p-4'> {cookies['userid']} </div>
            }
          </header>
          <section className='d-flex p-4 justify-content-center align-items-center' style={{height:'100vh'}}>
              <Routes>
            <Route path='login' element={<UserLogin />} />
            <Route path='register' element={<UserRegister />} />
            <Route path='dashboard' element={<UserDashboard />} />
            <Route path='invalid' element={<UserInvalid />} />
          </Routes>
          </section>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
