import {Route, BrowserRouter as Router} from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import AllRoutes from './Routes';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchAllQuestions } from './actions/question';
import { fetchAllUsers } from './actions/users';

function App() {

  const dispatch=useDispatch();

  useEffect(() => {
    dispatch(fetchAllQuestions())
    dispatch(fetchAllUsers())
  }, [dispatch])

  const [slideIn, setSlideIn] = useState(true);

  const handleSlideIn = () => {
    if (window.innerWidth <= 760) {
      setSlideIn((state) => !state);
    }
  };

  return (
    <div className="App">
      <Router>
      <Navbar handleSlideIn={handleSlideIn} />
      <AllRoutes slideIn={slideIn} handleSlideIn={handleSlideIn} />
      </Router>
    </div>
  );
}

export default App;
