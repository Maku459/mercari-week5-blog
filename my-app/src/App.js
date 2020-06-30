import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import Form from './Form';
import BlogListItem from './BlogListItem';

class App extends React.Component {
  render(){
    return (
      <div className="App-container">
        <Form />
      </div>
    );
  }
}

export default App;
