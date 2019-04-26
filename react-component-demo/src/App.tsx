import React from 'react';
import './App.scss';
import DateTimePicker from './components/DateTimePicker/dateTimePicker';

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <DateTimePicker  />
      </header>

    </div>
  );
};
export default App;
