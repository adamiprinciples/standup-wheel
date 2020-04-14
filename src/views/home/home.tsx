import * as React from "react";
import * as _ from "underscore";
import { Button, Icon } from "@rocketmakers/armstrong";
import { RouteComponentProps } from 'react-router';

import "./home.scss";

export const HomeView: React.FunctionComponent<RouteComponentProps> = props => {
  const audio = React.useRef<HTMLAudioElement>();
  const [muted, setMuted] = React.useState(false);
  const [spinning, setSpinning] = React.useState(false);
  const greetings = [
    "Look out, here comes", 
    "Just what we need. It's", 
    "You'll never believe who it is... It's", 
    "Let's hear it for", 
    "F** YEAH, IT'S",
    "Hold your applause, It's",
    "It is me. The",
    "It's the magical, the wonderful",
    "Classic",
    "I guess we should hear from",
    "Fresh out of the circus it's",
    "The hero Gotham needs... It's",
    "I sure hope everyones ready for",
    "It's that time again. The time for",
    "Hold the phone! It's",
    "The one and only",
    "*THE* original gangster",
    "Lock your doors and close the curtains, it's",
    "The stage is yours",
    "Wow man. It's"
  ]
  const [greetingsPool, setGreetingsPool] = React.useState(greetings)
  const [currentGreeting, setCurrentGreeting] = React.useState("");
  //const names = ["Adam", "Ben", "Phil"]
  const names = ["Adam", "Ben", "Phil", "Joe", "Danny", "Keith", "Richard", "Nathan", "Alice", "Luke", "Dave H", "Dave K", "Hannah", "Audrey", "Katie", "Matt", "Briony", "James", "John", "Patrick", "Rob", "Evan", "Jonny", "Felix", "Vince"];
  const onHoliday = ["Patrick", "Nick", "Sam"];

  const [namesLeft, setNamesLeft] = React.useState(names);
  const [currentName, setCurrentName] = React.useState("");

  const [transitionsEnabled, setTransitionsEnabled] = React.useState(true);
  const segmentSize = 360 / names.length;
  const extraSpins = 6;
  const spinTime = 4.2;

  const [angle, setAngle] = React.useState(segmentSize / 2);

  const pickName = () => {
    if (spinning) {
      return;
    }
    let name: string = _.sample(namesLeft);
    spinarooni(name);
  }


  const spinarooni = (name: string) => {
    setCurrentName(null);
    setSpinning(true);
    setTransitionsEnabled(true);

    const personIndex = names.indexOf(name) + 1;
    const offset = segmentSize / 2;
    const personAngle = segmentSize;
    const index = names.length - personIndex;
    const targetAngle = (personAngle * index) + offset;
    setAngle(targetAngle + (360 * extraSpins));
    if (audio.current){
      audio.current.pause();
      audio.current.currentTime = 0;
      audio.current.play();
    }
    window.setTimeout(() => {
      const greeting = _.sample<string>(greetingsPool);
      setCurrentGreeting(greeting);
      if (greetingsPool.length > 1){
        setGreetingsPool(_.reject(greetingsPool, g => g === greeting));
      } else {
        setGreetingsPool([...greetings])
      }
      setSpinning(false);
      setTransitionsEnabled(false);
      setAngle(targetAngle);
      setCurrentName(name);
      setNamesLeft(_.reject(namesLeft, n => n === name));
    }, spinTime * 1000);
  }

  return (
    <div className="wrapper">
      <audio muted={muted} ref={audio} src={require('../../assets/audio/cd.mp3')}/>
      <Button className="mute-button" onClick={() => setMuted(!muted)} leftIcon={muted ? Icon.Icomoon.volumeMute4 : Icon.Icomoon.volume0}/>
      <div className="wheel-house">
        <div className={`wheel ${spinning ? 'spinning': ''}`} style={{ transitionProperty: transitionsEnabled ? 'all' : 'none', transform: `rotate(${angle}deg)`, transitionDuration: `${spinTime}s` }}>
          {names.map((name, index) =>
            <div className={`seg${namesLeft.includes(name) ? '' : ' drawn'}${currentName === name ? ' active': ''}`} style={{ transform: `rotate(${segmentSize * index}deg)` }}>
              <label style={{ transform: `translateY(-50%) rotate(${segmentSize / 2}deg)` }}>{name}</label>
              <div style={{ transform: `translateY(-50%) rotate(${segmentSize / 2}deg)` }} className="peg" />
            </div>
          )}
          <div className="center" style={{ backgroundImage: `url('${require('../../assets/images/logo.png')}')` }} />
        </div>
        <div style={{ animationDuration: `${spinTime}s` }} className={`ticker ${spinning ? 'spinning' : ''}`} />
      </div>
      <div className="ui-wrapper">
        <div className="name-holder">
        {currentName && 
        <>
        <h2 className="slide-in-down">{currentGreeting}</h2>
        <h1 className="scale-down-in">{currentName}.</h1>
        </>}
        </div>
        <Button disabled={namesLeft.length === 0} pending={spinning} className="shadow bg-brand-primary" onClick={pickName}>{namesLeft.length === 0 ? 'It\'s all over' : 'SPIN THE WHEEL!'}</Button>
      </div>
    </div>
  );
}