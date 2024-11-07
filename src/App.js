import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import { Toaster } from 'react-hot-toast';
import ProtectedRoute from './redux/ProtectedRoute';

function App() {
  return (
    <>
      <Toaster />

      <BrowserRouter>
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route path='/' element={"Home"} />
          </Route>
          <Route path='/login' element={<LoginForm />} />
        </Routes>
      </BrowserRouter>
    </>

  );
}

export default App;
