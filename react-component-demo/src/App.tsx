import React from 'react';
import logo from './logo.svg';
import './App.scss';
import DateTimePicker from './components/DateTimePicker/dateTimePicker';

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <DateTimePicker  />
      </header>

    </div>
  );
};

export default App;
