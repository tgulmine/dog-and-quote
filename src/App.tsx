import React, { useState, useEffect } from 'react';
import './styles/main.scss';
import axios from 'axios';
import logo from './img/logo.png';
import pattern from './img/pattern.png';

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

  function refreshPage() {
    window.location.reload();
  }

  return (
    <div className="roboto bg-dog w-screen h-screen md:flex-none md:flex-col items-center justify-around md:justify-start">
      {/* <div className="text-3xl xl:text-4xl font-bold pt-4 text-center text-white pt-6">Dog and Quote</div> */}
      <img className="logo ml-auto mr-auto pt-6 cursor-pointer" alt="" src={logo} onClick={refreshPage}></img>
      <div className="dog-height dog-margin flex justify-center items-center md:mt-4 xl:mt-8">
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
        className="ml-auto mr-auto text-lg xl:text-xl font-bold italic mt-8 md:mt-4 text-pink-dog text-center
        max-w-xs md:max-w-lg lg:max-w-xl"
      >
        {active ? `"${quote}"` : `${quote}`}
      </div>
      <div
        className="btn border border-pink-dog rounded cursor-pointer ml-auto mr-auto text-pink-dog w-1/5 lg:w-1/6 xl:w-1/7 mt-8 lg:mt-6 xl:mt-8
        hover:bg-pink-dog hover:text-white"
        onClick={getData}
      >
        <div className="text-sm lg:text-base xl:text-lg text-center mt-2 mb-2 font-bold">Get a new dog</div>
      </div>
    </div>
  );
};

export default App;
