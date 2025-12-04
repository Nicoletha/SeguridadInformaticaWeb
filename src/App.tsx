import { useState, useEffect } from 'react';
import { Login } from './components/Login';
import { Register } from './components/Register';
import { Dashboard } from './components/Dashboard';
import { Header } from './components/Header';

export default function App() {
  const [currentView, setCurrentView] = useState<'login' | 'register' | 'dashboard'>('login');
  const [currentUser, setCurrentUser] = useState<string | null>(null);

  useEffect(() => {
    const loggedInUser = localStorage.getItem('currentUser');
    if (loggedInUser) {
      setCurrentUser(loggedInUser);
      setCurrentView('dashboard');
    }
  }, []);

  const handleLogin = (username: string) => {
    setCurrentUser(username);
    localStorage.setItem('currentUser', username);
    setCurrentView('dashboard');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
    setCurrentView('login');
  };

  const handleSwitchToRegister = () => {
    setCurrentView('register');
  };

  const handleSwitchToLogin = () => {
    setCurrentView('login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent pointer-events-none" />
      
      {currentUser && <Header onLogout={handleLogout} username={currentUser} />}
      
      <div className="relative">
        {currentView === 'login' && (
          <Login 
            onLogin={handleLogin} 
            onSwitchToRegister={handleSwitchToRegister}
          />
        )}
        
        {currentView === 'register' && (
          <Register 
            onRegister={handleLogin}
            onSwitchToLogin={handleSwitchToLogin}
          />
        )}
        
        {currentView === 'dashboard' && currentUser && (
          <Dashboard username={currentUser} />
        )}
      </div>
    </div>
  );
}
