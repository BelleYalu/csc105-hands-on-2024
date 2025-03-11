import './App.css';
import { useState } from 'react';

const calPage = () =>{
  const [answer , setAnswer] = useState(0);
  const [input, setInput] = useState('');

  function ResetAnswer (){
      setAnswer(0);

  }

  function Resetinput (){
      setInput('');
  }

  function plus () {
      setAnswer((p) => p + input);
  }

  function sub (){
      setAnswer((p) => p - input);
  }

  function multipy(){
      setAnswer((p) => p*input);
  }

  function divi(){
      setAnswer((p) => p / input);
  }

  return(
    <>
    <div className='Box'>
    <div>
      <div className='Cal'>Calculator</div>
    </div>
    <div>
      <input
        type='text'
        value={input}
        onChange={(e) => {
          if (isNaN(e.target.value)) return;
          setInput(Number(e.target.value));

        }}
      />
    </div>
        <div className='allbox'>
        <div className='botton'>
      <button onClick={plus}>Add</button>
      <button onClick={sub}>Subtract</button>
    </div>

    <div className='botton'>
      <button onClick={multipy}>Multiply</button>
      <button onClick={divi}>Divide</button>
    </div>

    <div className='botton'>
      <button onClick={Resetinput}>Clear Input</button>
      <button onClick={ResetAnswer}>Reset Result</button>
    </div>
    <div className='Ans'>
      <p>Result: {answer}</p>
    </div>
        </div>
   
    </div>
   

    </>
  );
};
export default calPage;
