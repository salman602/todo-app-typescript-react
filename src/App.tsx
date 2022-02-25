import React from 'react';
import Header from './components/Header';
import List from './components/List';

function App() {
  return (
    <div>
      <Header />
      <div className='list_items'>
        <List />
      </div>
    </div>
  );
}

export default App;
