import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Header from './Components/Header';
import Footer from './Components/Footer';

import HomePage from './Pages/HomePage';
import Profile from './Pages/Profile';
import NotFound from './Pages/NotFound';

import { ThemeProvider } from './Context/ThemeContext';

function App() {
  return (
    <div className="flex flex-col justify-between h-screen">
      <ThemeProvider>
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/404" element={<NotFound />} />
            <Route path="/:username" element={<Profile />} />
            <Route path="/*" element={<NotFound />} />
          </Routes>
          <Footer />
        </Router>
      </ThemeProvider>
    </div>
  );
}

export default App;
