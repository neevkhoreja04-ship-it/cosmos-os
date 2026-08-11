import { useState } from 'react';

export default function Calculator() {
  const [display, setDisplay] = useState('0');
  const [equation, setEquation] = useState('');
  const [waitingForOperand, setWaitingForOperand] = useState(false);
  const [operator, setOperator] = useState<string | null>(null);
  const [previousValue, setPreviousValue] = useState<number | null>(null);

  const calculate = (a: number, b: number, op: string) => {
    switch (op) {
      case '+': return a + b;
      case '-': return a - b;
      case '×': return a * b;
      case '÷': return b !== 0 ? a / b : NaN;
      default: return b;
    }
  };

  const inputDigit = (digit: string) => {
    if (waitingForOperand) {
      setDisplay(digit);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? digit : display + digit);
    }
  };

  const inputDot = () => {
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.');
    }
  };

  const clear = () => {
    setDisplay('0');
    setEquation('');
    setWaitingForOperand(false);
    setOperator(null);
    setPreviousValue(null);
  };

  const toggleSign = () => {
    setDisplay((parseFloat(display) * -1).toString());
  };

  const inputPercent = () => {
    setDisplay((parseFloat(display) / 100).toString());
  };

  const performOperation = (nextOperator: string) => {
    const inputValue = parseFloat(display);

    if (previousValue == null) {
      setPreviousValue(inputValue);
      setEquation(`${inputValue} ${nextOperator}`);
    } else if (operator) {
      const currentValue = previousValue || 0;
      const newValue = calculate(currentValue, inputValue, operator);

      setDisplay(String(newValue));
      setPreviousValue(newValue);
      setEquation(`${newValue} ${nextOperator}`);
    }

    setWaitingForOperand(true);
    setOperator(nextOperator);
  };

  const handleEqual = () => {
    if (!operator || previousValue == null) return;
    
    const inputValue = parseFloat(display);
    const newValue = calculate(previousValue, inputValue, operator);
    
    setDisplay(String(newValue));
    setEquation('');
    setPreviousValue(null);
    setOperator(null);
    setWaitingForOperand(true);
  };

  const Button = ({ children, onClick, className = '' }: { children: React.ReactNode, onClick: () => void, className?: string }) => (
    <button 
      onClick={onClick}
      className={`text-xl font-medium flex items-center justify-center rounded-full hover:bg-white/20 active:scale-95 transition-all bg-white/5 border border-white/10 ${className}`}
    >
      {children}
    </button>
  );

  return (
    <div className="h-full flex flex-col bg-black/40 text-white p-4 font-sans">
      {/* Display */}
      <div className="flex-1 flex flex-col justify-end items-end p-4 mb-2">
        <div className="text-white/50 text-sm h-6 mb-1">{equation}</div>
        <div className="text-6xl font-light tracking-tighter truncate w-full text-right">
          {display}
        </div>
      </div>

      {/* Keypad */}
      <div className="grid grid-cols-4 gap-3 flex-1 min-h-[300px]">
        <Button onClick={clear} className="text-orange-400">AC</Button>
        <Button onClick={toggleSign}>+/-</Button>
        <Button onClick={inputPercent}>%</Button>
        <Button onClick={() => performOperation('÷')} className="bg-orange-500/20 text-orange-400 border-orange-500/30 hover:bg-orange-500/30">÷</Button>

        <Button onClick={() => inputDigit('7')}>7</Button>
        <Button onClick={() => inputDigit('8')}>8</Button>
        <Button onClick={() => inputDigit('9')}>9</Button>
        <Button onClick={() => performOperation('×')} className="bg-orange-500/20 text-orange-400 border-orange-500/30 hover:bg-orange-500/30">×</Button>

        <Button onClick={() => inputDigit('4')}>4</Button>
        <Button onClick={() => inputDigit('5')}>5</Button>
        <Button onClick={() => inputDigit('6')}>6</Button>
        <Button onClick={() => performOperation('-')} className="bg-orange-500/20 text-orange-400 border-orange-500/30 hover:bg-orange-500/30">-</Button>

        <Button onClick={() => inputDigit('1')}>1</Button>
        <Button onClick={() => inputDigit('2')}>2</Button>
        <Button onClick={() => inputDigit('3')}>3</Button>
        <Button onClick={() => performOperation('+')} className="bg-orange-500/20 text-orange-400 border-orange-500/30 hover:bg-orange-500/30">+</Button>

        <Button onClick={() => inputDigit('0')} className="col-span-2 rounded-full !justify-start pl-8">0</Button>
        <Button onClick={inputDot}>.</Button>
        <Button onClick={handleEqual} className="bg-orange-500/80 text-white border-orange-500 hover:bg-orange-500">=</Button>
      </div>
    </div>
  );
}