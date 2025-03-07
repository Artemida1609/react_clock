import React from 'react';
import './App.scss';

function getRandomName(): string {
  const value = Date.now().toString().slice(-4);

  return `Clock-${value}`;
}

type Props = {
  name: string;
};

type State = {
  today: Date;
  clockName: string;
  hasClock: boolean;
};

export class App extends React.Component<Props, State> {
  state: Readonly<State> = {
    today: new Date(),
    clockName: 'Clock-0',
    hasClock: true,
  };

  timerId = 0;
  clockId = 0;

  setHasClockFalse = (event: MouseEvent) => {
    event.preventDefault();
    this.setState({ hasClock: false });
  };

  setHasClockTrue = (event: MouseEvent) => {
    event.preventDefault();
    this.setState(() => ({
      today: new Date(),
      hasClock: true,
    }));
  };

  handleClockId = () => {
    this.setState({ clockName: getRandomName() });
  };

  handleTimerId = () => {
    if (this.state.hasClock) {
      this.setState({
        today: new Date(),
      });
      // eslint-disable-next-line no-console
      console.log(new Date().toUTCString().slice(-12, -4));
    }
  };

  componentDidMount(): void {
    this.timerId = window.setInterval(this.handleTimerId, 1000);
    this.clockId = window.setInterval(this.handleClockId, 3300);

    document.addEventListener('contextmenu', this.setHasClockFalse);
    document.addEventListener('click', this.setHasClockTrue);
  }

  componentDidUpdate(
    prevProps: Readonly<Props>,
    prevState: Readonly<State>,
    snapshot?: any,
  ): void {
    if (!prevState.hasClock && this.state.hasClock) {
      this.timerId = window.setInterval(this.handleTimerId, 1000);
      window.clearInterval(this.clockId);
      this.clockId = window.setInterval(this.handleClockId, 3300);
    }
    
    if (prevState.hasClock && !this.state.hasClock) {
      // window.clearInterval(this.clockId);
      window.clearInterval(this.timerId);
    }

    if ((prevState.clockName !== this.state.clockName)) {
      console.warn(
        `Renamed from ${prevState.clockName} to ${this.state.clockName}`,
      );
    }
  }
  
  componentWillUnmount(): void {
    if (this.clockId) {
      window.clearInterval(this.clockId);
    }

    if (this.timerId) {
      window.clearInterval(this.timerId);
    }

    document.removeEventListener('contextmenu', this.setHasClockFalse);
    document.removeEventListener('click', this.setHasClockTrue);
  }

  render(): React.ReactNode {
    return (
      <div className="App">
        <h1>React clock</h1>
        {this.state.hasClock && (
          <div className="Clock">
            <strong className="Clock__name">{this.state.clockName}</strong>

            {' time is '}

            <span className="Clock__time">
              {this.state.today.toUTCString().slice(-12, -4)}
            </span>
          </div>
        )}
      </div>
    );
  }
}
