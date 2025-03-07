import React from 'react';
import './App.scss';
import { Clock } from './Clock';

type State = {
  hasClock: boolean;
};

export class App extends React.Component<{}, State> {
  state: Readonly<State> = {
    hasClock: true,
  };

  setHasClockFalse = (event: MouseEvent) => {
    event.preventDefault();
    this.setState({ hasClock: false });
  };

  setHasClockTrue = (event: MouseEvent) => {
    event.preventDefault();
    this.setState(() => ({
      hasClock: true,
    }));
  };

  

  componentDidMount(): void {
    document.addEventListener('contextmenu', this.setHasClockFalse);
    document.addEventListener('click', this.setHasClockTrue);
  }
  
  componentWillUnmount(): void {
    document.removeEventListener('contextmenu', this.setHasClockFalse);
    document.removeEventListener('click', this.setHasClockTrue);
  }

  render(): React.ReactNode {
    return (
      <div className="App">
        <h1>React clock</h1>
        {this.state.hasClock &&
          <Clock />
        }
      </div>
    );
  }
}
