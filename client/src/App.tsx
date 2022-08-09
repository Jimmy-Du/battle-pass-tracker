import { Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/layout/navbar/Navbar';
import Games from './components/games/Games';
import SelectGames from './components/selectGames/SelectGames';
import Footer from './components/layout/footer/Footer';
import Events from './components/events/Events';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Games />} />
        <Route path="/events" element={<Events/>} />
        <Route path="/select-games" element={<SelectGames />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
