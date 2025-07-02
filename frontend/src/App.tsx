import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './components/AppStyles.scss';
import Home from './pages/home/home';
import Profile from './pages/profile/profile';
import Drops from './pages/drops/drops';
import Stats from './pages/stats/stats';
import Settings from './pages/settings/settings';

function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <div className="app-container">
        {/* Навигационное меню */}
        <nav className="nav-menu">
          <ul className="nav-list">
            <li><Link to="/" className="nav-link">Главная</Link></li>
            <li><Link to="/profile" className="nav-link">Профиль</Link></li>
            <li><Link to="/drops" className="nav-link">Дропы</Link></li>
            <li><Link to="/stats" className="nav-link">Статистика</Link></li>
            <li><Link to="/settings" className="nav-link">Настройки</Link></li>
          </ul>
        </nav>

        {/* Контент */}
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/drops" element={<Drops />} />
            <Route path="/stats" element={<Stats />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </div>

        {/* Счетчик для теста */}
        <div className="counter-section">
          <p className="counter-text">Counter: {count}</p>
          <button className="button" onClick={() => setCount((count) => count + 1)}>
            Click me
          </button>
        </div>
      </div>
    </Router>
  );
}

export default App;