import React from 'react';
import ReactDOM from 'react-dom/client';
import Search from './components/Search';

const App = () => {
  return (
    <div>
      <Search />
    </div>
  );
};

const root = ReactDOM.createRoot(document.querySelector('#root'));
root.render(<App />);
