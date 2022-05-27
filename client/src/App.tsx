import { Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/layout/navbar/Navbar';
import Home from './components/home/Home';
import SelectGames from './components/selectGames/SelectGames';
import Footer from './components/layout/footer/Footer';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/select-games" element={<SelectGames />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
