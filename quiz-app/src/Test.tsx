import React, { Component, useState } from "react";

interface IProps {}

interface IState {
  color?: string;
}

class Test extends Component<IProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = { color: "red" };
  }

  render() {
    return <div>Color is {this.state.color}</div>;
  }
}

export default Test;

export const Button = ({ value }: any) => {
  const [count, setCount] = useState(1);

  return (
    <div>
      <button onClick={() => setCount((p) => p + 1)}>Increment</button>
      {count}
      {value}
    </div>
  );
};
