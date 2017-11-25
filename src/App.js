import React, { PureComponent } from 'react';
import cs from 'classnames';
import {initCells, updateCells} from './game';
import './App.css';

class App extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      cells: initCells()
    };
  }


  render() {
    return (
      <div className="App">
        {this.renderCells(this.state.cells)}
      </div>
    );
  }


  renderCells(cells) {
    return cells.map((row, i) =>
      <div className="row" key={i}>
        {row.map((c, j) => 
          <div className={cs('cell', c ? 'alive' : 'dead')} key={j}>o</div>)
        }
      </div>
    );
  }


  componentDidMount() {
    this.startGame();
  }


  startGame() {
    setTimeout(() => updateCells(
      this.state.cells,
      cells => this.setState({ cells })
    ), 500);
  }
}


export default App;
