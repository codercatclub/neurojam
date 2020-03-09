import { useState } from 'react';
import axios from 'axios';
import Head from 'next/head';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import s from './index.module.css';
import InputField from '../../components/InputField';
import Slider from '../../components/Slider';
import ErrorMessage from '../../components/ErrorMessage';

const BotTab = () => (
  <>
    <p>
      This is a bot for{' '}
      <a href="https://github.com/Qirky/Troop" target="_blank">
        Troop
      </a>{' '}
      that takes user drum patterns and turns them into a masterpiece using a
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

const getDrums = (pattern, length, randomness, onSuccess, onFailure) => {
  const payload = { pattern, length, randomness };
  axios
    .post('https://codercat.tk/livecoding/foxdot/ai-drums', payload)
    .then(res => {
      onSuccess(res.data);
    })
    .catch(err => onFailure(err.response.data));
};

const APITab = () => {
  const [pattern, setPattern] = useState('');
  const [length, setLength] = useState(8);
  const [randomness, setRandomness] = useState(1.5);
  const [result, setResult] = useState('');
  const [error, setError] = useState('');
  const [isCopied, setIsCopied] = useState(false);

  const copyBtnText = isCopied ? 'Copied!' : 'Copy';

  const handleSubmit = () => {
    setError('');
    setResult('');
    setIsCopied(false);
    getDrums(
      pattern,
      length,
      randomness,
      data => setResult(data),
      msg => setError(msg),
    );
  };

  return (
    <div>
      <div className={s.description}>
        This project is an API for using the magenta machine learning tool to
        generate FoxDot drum patterns. After providing a seed pattern, the
        neural network will dream up a continuation to your pattern. The API
        output format is ready to go in FoxDot format, and can be executed
        automatically or copied, pasted, and edited. For more info see{' '}
        <a
          href="https://github.com/sneha-belkhale/livecoding-ai-drums"
          target="_blank"
        >
          Github
        </a>{' '}
        page.
      </div>
      <div className={s.form}>
        <InputField
          value={pattern}
          type="text"
          placeholder="Starting Pattern"
          onChange={e => setPattern(e.target.value)}
          onKeyDown={e => (e.key === 'Enter' ? handleSubmit() : null)}
        />
        <Slider
          value={length}
          name="length"
          label="Length"
          min={3}
          max={40}
          onChange={e => setLength(e.target.value)}
        />
        <Slider
          name="randomness"
          value={randomness}
          label="Randomness"
          min={0}
          max={10}
          step={0.1}
          onChange={e => setRandomness(e.target.value)}
        />
        <div className={s.button} type="button" onClick={handleSubmit}>
          GENERATE
        </div>

        <div className={s.result}>{result}</div>
        <ErrorMessage text={error} />

        {result !== '' ? (
          <CopyToClipboard text={result} onCopy={() => setIsCopied(true)}>
            <span className={s.simpleButton}>{copyBtnText}</span>
          </CopyToClipboard>
        ) : null}
      </div>
    </div>
  );
};

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
