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

  function clickImage() {
    if (window.innerWidth < 768) getData();
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="bg-yellow-700 w-screen h-screen flex-col items-center justify-between md:justify-start">
      <div className="text-3xl md:text-4xl xl:text-5xl font-bold pt-4 text-center text-white">Dog and Quote</div>

      <div className="dog-height flex justify-center items-center mt-8">
        {active ? (
          <img className="dog-max-size" alt="" src={dog} onClick={clickImage} />
        ) : (
          <div className="lds-ring">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        )}
      </div>

      <div
        className="ml-auto mr-auto text-base lg:text-lg xl:text-xl font-normal italic mt-4 text-white text-center
      max-w-xs md:max-w-lg lg:max-w-xl"
      >
        {quote}
      </div>
      <div
        className="btn border border-white rounded cursor-pointer ml-auto mr-auto text-white w-1/5 lg:w-1/6 xl:w-1/7 mt-10 lg:mt-12 xl:mt-16
        hover:bg-white hover:text-yellow-700"
        onClick={getData}
      >
        <div className="text-sm lg:text-base xl:text-lg text-center mt-2 mb-2 font-bold">Get a new dog</div>
      </div>
    </div>
  );
};

export default App;
