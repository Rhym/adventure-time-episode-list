import React, {Component} from 'react';

import Header from './Components/Header/Header';
import Table from './Components/Table/Table';

import 'normalize.css/normalize.css';
import '@blueprintjs/core/dist/blueprint.css';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="app">
        <Header />
        <Table />
      </div>
    );
  }
}

export default App;
