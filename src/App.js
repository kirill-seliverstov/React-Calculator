import React, { useState } from "react";
import { Button } from "./components/button";
import "./App.css";

function App() {
  let [history, setHistory] = useState("");
  const [current, setCurrent] = useState("0");
  const [expression, setExpression] = useState([]);
  const [result, setResult] = useState("");
  const [flag, setFlag] = useState(false); // flag to check if result is displayed

  const numbersButtons = [
    {
      value: "7",
      id: "seven"
    },
    {
      value: "8",
      id: "eight"
    },
    {
      value: "9",
      id: "nine"
    },
    {
      value: "4",
      id: "four"
    },
    {
      value: "5",
      id: "five"
    },
    {
      value: "6",
      id: "six"
    },
    {
      value: "1",
      id: "one"
    },
    {
      value: "2",
      id: "two"
    },
    {
      value: "3",
      id: "three"
    },
    {
      value: "0",
      id: "zero"
    }
  ];

  const operationsButtons = [
    {
      value: "+",
      id: "plus",
      text: "+"
    },
    {
      value: "-",
      id: "minus",
      text: "-"
    },
    {
      value: "*",
      id: "multi",
      text: "×"
    },
    {
      value: "/",
      id: "divide",
      text: "÷"
    },
    {
      value: "=",
      id: "equal",
      text: "="
    }
  ];

  const manipulationButtons = [
    {
      value: "AC",
      id: "clear",
      text: "AC",
      onClick() {
        setCurrent("0");
        setHistory("");
        expression.length = 0;
        setResult("");
        setFlag(false);
      }
    },
    {
      value: "±",
      id: "set-megative",
      text: "±",
      onClick() {
        +current >= 0
          ? setCurrent(-Math.abs(+current))
          : setCurrent(Math.abs(+current));
      }
    },
    {
      value: "%",
      id: "percent",
      text: "%",
      onClick() {
        if (isFinite(current)) {
          setCurrent(current / 100)
        } else return current;
      }
    },
    {
      value: ".",
      id: "dot",
      text: ".",
      onClick() {
        String(numberWithSpaces(current)).includes(".")
          ? numberWithSpaces(+current)
          : setCurrent(numberWithSpaces(+current) + ".");
      }
    }
  ];

  // function to solve the equations
  const makeOperation = (expression) => {
    let a = expression[0];
    let op = expression[1];
    let b = expression[2];

    if (expression.length === 3) {
      if (op === "+") return +a + +b;
      if (op === "-") return +a - +b;
      if (op === "*") return +a * +b;
      if (op === "/") return +a / +b;
    }
  };

  // places spaces between thousands, millions etc.
  const numberWithSpaces = (number) => {
    let parts = number.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    return parts.join(".");
  };

  // operations onClick function
  const handleOperation = (op) => {
    if (expression.length < 2 && op !== "=") {
      expression.push(+current, op);

      setHistory((history += current + op));
      setCurrent(+expression[0]);
      if (flag === false) setFlag(true);
    } else if (expression.length === 2 && op !== "=" && !flag) {
      expression.push(+current);
      let expressionResult = makeOperation(expression);

      setCurrent(expressionResult);
      setResult(+expressionResult);

      setHistory((history += current + op));

      expression.length = 0;
      expression.push(expressionResult, op);

      setCurrent(expressionResult);
      if (flag === false) setFlag(true);
    } else if (expression.length === 2 && op === "=" && current !== "") {
      expression.push(+current);
      let expressionResult = makeOperation(expression);

      setHistory("");
      setResult(expressionResult);
      setCurrent(expressionResult);

      expression.length = 0;
      setFlag(true);
    } else if (expression.length === 2 && op === "=" && current === "") {
      setHistory("");
      setCurrent(expression[0]);
      expression.length = 0;
    } else if (expression.length === 2 && flag) {
      setHistory(history.replace(/.$/, op));
      expression[1] = op;
    }
  };

  return (
    <div className="calculator">
      <p id="history">{history}</p>
      <p className="history__current" id="current">
        {numberWithSpaces(+current)}
      </p>

      {manipulationButtons.map((val) => {
        return (
          <Button
            key={val.id}
            value={val.value}
            id={val.id}
            text={val.text}
            onClick={val.onClick}
            className={"button--manipulate"}
          />
        );
      })}

      {numbersButtons.map((num) => {
        return (
          <Button
            key={num.id}
            value={num.value}
            id={num.id}
            text={num.value}
            className={"button--number"}
            onClick={(e) => {
              if (String(current).length < 15) {
                if (+current === 0 && current !== "0.") {
                  setCurrent(e.target.value);
                } else if (flag) {
                  setCurrent(e.target.value);
                  setFlag(false);
                } else setCurrent(current + e.target.value);
              } else setCurrent(e.target.value);
            }}
          />
        );
      })}

      {operationsButtons.map((op) => {
        return (
          <Button
            key={op.id}
            value={op.value}
            id={op.id}
            text={op.text}
            className={"button--operation"}
            onClick={(e) => {
              handleOperation(e.target.value);
            }}
          />
        );
      })}

      {/* <p>expression: {expression.join(" ")}</p>
      <p>result: {result}</p>
      <p>flag: {String(flag)}</p> */}
    </div>
  );
}

export default App;
