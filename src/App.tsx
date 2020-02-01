import React, { useState, useEffect } from 'react';
import './styles/main.scss';
import axios from 'axios';

const App: React.FC = () => {
  const [dog, setDog] = useState('');
  const [quote, setQuote] = useState('');
  const [active, setActive] = useState(false);

  async function getData() {
    setActive(false);
    setQuote('Loading...');
    try {
      const res = await axios.get(`https://dog.ceo/api/breeds/image/random`);
      console.log(res);
      setDog(res.data.message);
    } catch (err) {
      console.log(err);
    }
    try {
      const res = await axios.get(`https://type.fit/api/quotes`);
      console.log(res);
      setTimeout(() => {
        setQuote(res.data[Math.floor(Math.random() * (res.data.length - 1))].text);
        setActive(true);
      }, 1000);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="bg-yellow-700 w-screen h-screen flex-col items-center">
      <div className="text-5xl font-bold pt-4 text-center text-white">Dog and Quote</div>

      <div className="dog-size flex justify-center items-center mt-8">
        {active ? (
          <img className="dog-max-size" alt="" src={dog} />
        ) : (
          <div className="lds-ring">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        )}
      </div>

      <div className="text-lg font-light mt-4 text-white text-center">{quote}</div>
      <div
        className="border border-white rounded cursor-pointer ml-auto mr-auto text-white w-1/6 mt-20
        hover:bg-white hover:text-yellow-700"
        onClick={getData}
      >
        <div className="text-lg text-center mt-2 mb-2 font-bold">Get a new dog</div>
      </div>
    </div>
  );
};

export default App;
