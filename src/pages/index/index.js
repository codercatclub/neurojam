import { useState } from 'react';
import Head from 'next/head';
import s from './index.module.css';

const BotTab = () => (
  <>
    <p>
      Neurojam is a bot for{' '}
      <a href="https://github.com/Qirky/Troop" target="_blank">
        Troop
      </a>{' '}
      that takes my drum patterns and turns them into a masterpiece using a
      machine learning model from the{' '}
      <a href="https://magenta.tensorflow.org/" target="_blank">
        Magenta
      </a>{' '}
      project.
    </p>
    <p>
      In this setup the bot connects to a Troop server and waits for a
      particular line such as <b>sprucey -l 8 -r 1.7 @xx..x</b>
      where <b>-l</b> is length of returned pattern, <b>-r</b> is randomness and
      string after @ is a drum pattern. It grab this pattern and pipe it to a
      pre-trained model that try to extend this pattern and send it back.
    </p>

    <iframe
      id="video"
      className={s.video}
      width="100%"
      height="415"
      src="https://www.youtube.com/embed/B_tNvMf6vGM?autoplay=1&amp;rel=0&amp;start=60&amp;showinfo=0&amp;mute=1"
      frameborder="0"
      allow="autoplay"
      allowFullScreen
    />
  </>
);

const APITab = () => (
  <div>
    <form action="https://codercat.tk/livecoding/sprucey" id="spruceyForm">
      <label for="pattern">Pattern:</label>
      <input type="text" id="pattern" name="pattern" value="x x .  rr" />

      <label for="length">Length:</label>
      <input
        type="number"
        id="length"
        name="length"
        min="1"
        max="50"
        value="8"
      />

      <label for="randomness">Randomness:</label>
      <input
        type="number"
        step="0.1"
        id="randomness"
        name="randomness"
        min="0"
        max="10"
        value="1.5"
      />

      <input type="submit" value="Submit" />
    </form>
  </div>
);

const Home = () => {
  const [tab, setTab] = useState('bot');
  const tabs = ['BOT', 'API'];

  const tabsElements = tabs.map(tabName => {
    const tabID = tabName.toLocaleLowerCase();
    const tabStyle = tab === tabID ? s.active : '';
    return (
      <li className={tabStyle} onClick={() => setTab(tabID)}>
        {tabName}
      </li>
    );
  });

  return (
    <div className={s.container}>
      <div className={s.background}>
        <img
          className={s.backgroundImage}
          src="electric.gif"
          id="background-image"
          alt="Electric Web"
        />
      </div>

      <div className={s.content}>
        <h1 className={s.title}>NEUROJAM</h1>
        <ul className={s.tabHeader}>{tabsElements}</ul>
        <div className={s.tab}>{tab === 'bot' ? <BotTab /> : <APITab />}</div>
      </div>
    </div>
  );
};

export default Home;
