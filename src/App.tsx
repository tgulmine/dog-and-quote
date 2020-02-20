import React, { useState, useEffect } from 'react';
import './styles/main.scss';
import axios from 'axios';
import logo from './img/logo.png';

const App: React.FC = () => {
  const [dog, setDog] = useState('');
  const [quote, setQuote] = useState('');
  const [active, setActive] = useState(false);

  async function getData() {
    setActive(false);
    setQuote('');
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

  function refreshPage() {
    window.location.reload();
  }

  return (
    <div className="roboto bg-dog w-screen h-screen md:flex-none md:flex-col items-center justify-around md:justify-start">
      <div className="bg-pink-dog-light w-full pt-1 absolute" />
      <img className="logo ml-auto mr-auto pt-6 cursor-pointer" alt="" src={logo} onClick={refreshPage}></img>
      <div className="dog-height dog-margin flex justify-center items-center md:mt-4 xl:mt-8">
        {active ? (
          <img className="dog-max-size rounded-xl shadow-xl cursor-pointer" alt="" src={dog} onClick={getData} />
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
        className="ml-auto mr-auto text-lg xl:text-xl font-bold italic mt-8 text-pink-dog-dark text-center
        max-w-xs md:max-w-lg lg:max-w-xl"
      >
        {active ? `"${quote}"` : null}
      </div>
      <div className="bg-pink-dog-light w-full pb-1 absolute bottom-0" />
    </div>
  );
};

export default App;
