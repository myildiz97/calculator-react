import { useState } from "react";

const App = () => {
  const [current, setCurrent] = useState("0");
  const [calculation, setCalculation] = useState("");
  const [result, setResult] = useState(null);
  const [flag, setFlag] = useState(false);

  const operators = ["+", "-", "*", "/"];
  const opsWoSub = ["+", "*", "/"];

  const handleClick = (e) => {
    let value = e.target.textContent;
    if (value === "x") value = "*";
    let lastResult = result;
    if (lastResult) {
      setResult(null);
      setCurrent(value);
    } else {
      if (!operators.includes(value)) {
        if (current.length === 1 && current === "0" || operators.includes(current)) {
          setCurrent(value);
        } else {
          if (value === ".") {
            !current.includes(value) && setCurrent(prev => prev + value);
          } else {
            setCurrent(prev => prev + value);
          }
        }
      } else if (operators.includes(value)) {
        setCurrent(value);
      };
    };
    if (!flag) {
      if (value === ".") {
        !current.includes(".") && setCalculation(prev => prev + value);
      } else if (opsWoSub.includes(value)) {
        !operators.includes(calculation.at(-1)) && setCalculation(prev => prev + value);
      } else if (value === "-") {
        (calculation.at(-1) !== "-" || (calculation.at(-1) === "-" && calculation.at(-2) !== "-")) && setCalculation(prev => prev + value);
      } else {
        if (calculation === "/" || calculation === "*") {
          setCalculation(value);
        } else {
          if (value === "0" && current.length < 1) {
            setCalculation(value);
          } else {
            calculation !== "0" &&  setCalculation(prev => prev + value);
          }
        };
      }
    } else {
      operators.includes(value) ? setCalculation(lastResult + value) : setCalculation(value);
      setFlag(false);
    };
  };

  const handleClear = () => {
    setCurrent("0");
    setResult(null);
    setCalculation("");
    setFlag(false);
  };

  const handleEqual = (e) => {
    if (!flag ) {
      const value = e.target.textContent;
      let calc = operators.includes(calculation.at(-1)) ? calculation.slice(0, -1) : calculation;
      console.log(calc);
      const result = eval(calc);
      setResult(result);
      operators.includes(calculation.at(-1)) ? setCalculation(prev => prev.slice(0, -1) + value + result) : setCalculation(prev => prev + value + result);
      setFlag(true);
    };
  };

  return (
    <div className="container">
      <div className="results">
        <div className="res">{calculation}</div>
        <div className="curr" id="display">{result || current}</div>
      </div>
      <div className="btns">
        <div onClick={handleClear} className="btn" id="clear">AC</div>
        <div onClick={handleClick} className="btn" id="divide">/</div>
        <div onClick={handleClick} className="btn" id="multiply">x</div>
        <div onClick={handleClick} className="btn" id="seven">7</div>
        <div onClick={handleClick} className="btn" id="eight">8</div>
        <div onClick={handleClick} className="btn" id="nine">9</div>
        <div onClick={handleClick} className="btn" id="subtract">-</div>
        <div onClick={handleClick} className="btn" id="four">4</div>
        <div onClick={handleClick} className="btn" id="five">5</div>
        <div onClick={handleClick} className="btn" id="six">6</div>
        <div onClick={handleClick} className="btn" id="add">+</div>
        <div onClick={handleClick} className="btn" id="one">1</div>
        <div onClick={handleClick} className="btn" id="two">2</div>
        <div onClick={handleClick} className="btn" id="three">3</div>
        <div onClick={handleEqual} className="btn" id="equals">=</div>
        <div onClick={handleClick} className="btn" id="zero">0</div>
        <div onClick={handleClick} className="btn" id="decimal">.</div>
      </div>
    </div>
  );
};

export default App;