import React from 'react';

type State = {
  today: Date;
  hasClock: boolean;
};

type Props = {
  name: string;
}

export class Clock extends React.Component<Props, State> {
  state: Readonly<State> = {
    today: new Date(),
    hasClock: true,
  };

  timerId = 0;


  handleTimerId = () => {
    if (this.state.hasClock) {
      this.setState({ today: new Date() });
      // eslint-disable-next-line no-console
      console.log(new Date().toUTCString().slice(-12, -4));
    }
  };

  componentDidMount(): void {
    this.timerId = window.setInterval(this.handleTimerId, 1000);
  }

  componentDidUpdate(
    prevProps: Readonly<{}>,
    prevState: Readonly<State>,
    snapshot?: any,
  ): void {
    if (!prevState.hasClock && this.state.hasClock) {
      this.timerId = window.setInterval(this.handleTimerId, 1000);
    }

    if (prevState.hasClock && !this.state.hasClock) {
      window.clearInterval(this.timerId);
    }
  }

  componentWillUnmount(): void {
    if (this.timerId) {
      window.clearInterval(this.timerId);
    }
  }

  render(): React.ReactNode {
    return (
      <div className="Clock">
        <strong className="Clock__name">{this.props.name}</strong>

        {' time is '}

        <span className="Clock__time">
          {this.state.today.toUTCString().slice(-12, -4)}
        </span>
      </div>
    );
  }
}
