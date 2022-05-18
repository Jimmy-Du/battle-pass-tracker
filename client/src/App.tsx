import './App.css';
import Navbar from './components/layout/navbar/Navbar';
import Home from './components/home/Home';
import Footer from './components/layout/footer/Footer';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Home />
      <Footer />
    </div>
  );
}

export default App;
