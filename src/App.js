import Home from './pages/Home';
import Landing from './pages/Landing';
import Header from './components/Header';
import Watchhistory from './pages/Watchhistory';
import Footer from './components/Footer';
import { Routes, Route ,React} from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div >
   <Header/>
    <Routes>
      <Route path='/' element={<Landing/>}/>
      <Route path='/home' element={<Home/>}/>
      <Route path='/watch' element={<Watchhistory/>}/>
    
    </Routes>
    <Footer/>
  </div>
  );
}

export default App;
