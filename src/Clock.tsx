import React from "react";

type State = {
  today: Date;
  hasClock: boolean,
};

type Props = {
  name: string;
}

export class Clock extends React.Component<Props, State> {
  state: Readonly<State> = {
    today: new Date(),
    hasClock: true,
  };

  

  componentDidMount(): void {
  }

  componentWillUnmount(): void {
    
  }

  // render(): React.ReactNode {
  //     return (
        
  //     )
  // }
}