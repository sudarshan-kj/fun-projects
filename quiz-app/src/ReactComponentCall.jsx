import React from "react";
import ReactDOM from "react-dom";

function Counter() {
  const [count, setCount] = React.useState(0);
  const increment = () => setCount((c) => c + 1);
  return <button onClick={increment}>{count}</button>;
}

//Refer to : https://github.com/kentcdodds/ama/issues/763, https://kentcdodds.com/blog/dont-call-a-react-function-component, https://dev.to/igor_bykov/react-calling-functional-components-as-functions-1d3l
function BadCounterList() {
  const [items, setItems] = React.useState([]);
  const addItem = () => setItems((i) => [...i, { id: i.length }]);
  return (
    <div>
      <button onClick={addItem}>Add Item</button>
      <div>{items.map(Counter)}</div>
    </div>
  );
}

function GoodCounterList(params) {
  const [items, setItems] = React.useState([]);
  const addItem = () => setItems((i) => [...i, { id: i.length }]);
  return (
    <div>
      <button onClick={addItem}>Add Item</button>
      <div>
        {items.map((i) => (
          <Counter key={i.id} />
        ))}
      </div>
    </div>
  );
}

function ErrorFallback({ error }) {
  return (
    <div>
      <div>Oh no, there was an error. Check the console for more info.</div>
      <div>
        <pre>{error.message}</pre>
      </div>
    </div>
  );
}

function BadApp() {
  return <BadCounterList />;
}

function GoodApp() {
  return <GoodCounterList />;
}

function Rendered(props) {
  return (
    <div
      style={{
        padding: 14,
        backgroundColor: "rgba(0,0,0,0.05)",
        borderRadius: 4,
        marginBottom: 20,
      }}
      {...props}
    />
  );
}

export { BadApp, GoodApp, Rendered };
