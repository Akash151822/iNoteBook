import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import About from './Components/About';
import Error from './Components/Error'
import NoteState from './Context/notes/noteState';
import Alert from './Components/Alert';
import Login from './Components/Login';
import SignUp from './Components/SignUp'
import { useState } from 'react';
function App() {
  const [alert, setAlert] = useState(null)
  const showAlert = (message, type) => {
    setAlert({
      message: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null)
    }, 600)
  }
  return (
    <>
      <NoteState>
        <Router>
          <Navbar />
          <Alert alert={alert} />
          <div className="container">
            <Routes>
              <Route path='/' element={<Home showAlert={showAlert} />} />
              <Route path='/about' element={<About />} />
              <Route path='/login' element={<Login showAlert={showAlert} />} />
              <Route path='/signup' element={<SignUp showAlert={showAlert} />} />
              <Route path='*' element={<Error />} />
            </Routes>
          </div>
        </Router>

      </NoteState>
    </>
  );
}

export default App;
