import React, { useState } from "react";
import { Button } from "./components/button";
import "./App.css";

function App() {
  let [history, setHistory] = useState("");
  const [current, setCurrent] = useState("0");
  const [expression, setExpression] = useState([]);
  const [result, setResult] = useState("");

  const numbersButtons = [7, 8, 9, 4, 5, 6, 1, 2, 3, 0];
  const operationsButtons = ["+", "-", "*", "/", "="];

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

  const handleOperation = (op) => {
    if (expression.length < 2) {
      expression.push(+current, op);

      setHistory((history += current + op));
      setCurrent("");

      console.log(expression);
    } else if (expression.length === 2 && op !== "=" && current !== "") {
      expression.push(+current);
      let expressionResult = makeOperation(expression);

      setCurrent(expressionResult);
      setResult(+expressionResult);

      setHistory((history += current + op));

      expression.length = 0;
      expression.push(expressionResult, op);

      console.log(expression);

      setCurrent("");
    } else if (expression.length === 2 && op === "=" && current !== "") {
      expression.push(+current);
      let expressionResult = makeOperation(expression);

      setHistory("");
      setResult(expressionResult);
      setCurrent(expressionResult);

      expression.length = 0;
    } else if (expression.length === 2 && current === "") {
      setHistory(history.replace(/.$/, op));
      expression[1] = op;
      console.log(expression);
    }
  };

  // каждая кнопка смотрит, есть ли в массиве число и операция, если да, кнопка
  //  выполняет операцию в массиве с лежащим в нем числом и current
  // смотреть есть ли операция в массиве и чуть что менять ее
  // флаг который когда на операцию true, если тру и жмем на цифру - фалсе

  return (
    <div className="calculator">
      <div>
        <div className="calculator__history">
          <p>history: {history}</p>
          <p className="history__current">{current}</p>
        </div>
      </div>

      <div className="calculator__wrapper">
        <div className="calculator__manipulations">
          <Button
            className={"button--manipulate"}
            value={"AC"}
            onClick={() => {
              setCurrent("0");
            }}
          />

          <Button
            className={"button--manipulate"}
            value={"±"}
            onClick={() =>
              +current >= 0
                ? setCurrent(-Math.abs(+current))
                : setCurrent(Math.abs(+current))
            }
          />

          <Button
            className={"button--manipulate"}
            value={"%"}
            onClick={() => {
              isFinite(current) ? setCurrent(current / 100) : current;
            }}
          />
        </div>

        <div className="calculator__numbers">
          {numbersButtons.map((num) => {
            return (
              <Button
                key={num}
                value={num}
                className={"button--number"}
                onClick={(e) => {
                  if (+current === 0 && current !== "0.") {
                    setCurrent(e.target.value);
                  } else setCurrent(current + e.target.value);
                }}
              />
            );
          })}
        </div>

        <div className="calculator__operations">
          {operationsButtons.map((op) => {
            return (
              <Button
                key={op}
                value={op}
                className={"button--operation"}
                onClick={(e) => {
                  handleOperation(e.target.value);
                }}
              />
            );
          })}
        </div>
      </div>

      <p>expression: {expression.join(" ")}</p>
      <p>result: {result}</p>
    </div>
  );
}

export default App;
