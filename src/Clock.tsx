import React from 'react';

function getRandomName(): string {
  const value = Date.now().toString().slice(-4);

  return `Clock-${value}`;
}

type State = {
  today: Date;
  hasClock: boolean;
  clockName: string;
};


export class Clock extends React.Component<{}, State> {
  state: Readonly<State> = {
    today: new Date(),
    hasClock: true,
    clockName: 'Clock-0',
  };

  timerId = 0;
  clockId = 0;

  handleClockId = () => {
    this.setState({ clockName: getRandomName() });
  };

  handleTimerId = () => {
    if (this.state.hasClock) {
      this.setState({ today: new Date() });
      // eslint-disable-next-line no-console
      console.log(new Date().toUTCString().slice(-12, -4));
    }
  };

  componentDidMount(): void {
    this.timerId = window.setInterval(this.handleTimerId, 1000);
    this.clockId = window.setInterval(this.handleClockId, 3300);
  }

  componentDidUpdate(
    prevProps: Readonly<{}>,
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

    if (prevState.clockName !== this.state.clockName) {
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
  }

  render(): React.ReactNode {
    return (
      <div className="Clock">
        <strong className="Clock__name">{this.state.clockName}</strong>

        {' time is '}

        <span className="Clock__time">
          {this.state.today.toUTCString().slice(-12, -4)}
        </span>
      </div>
    );
  }
}
