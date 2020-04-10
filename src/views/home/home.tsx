import * as React from "react";
import * as _ from "underscore";
import { Button } from "@rocketmakers/armstrong";
import { RouteComponentProps } from 'react-router';

import "./home.scss";
import { AppContext } from '../shell';

export const HomeView: React.FunctionComponent<RouteComponentProps> = props => {
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
    "I guess we best hear from",
    "Fresh out of the circus it's",
    "The hero Gotham needs... It's",
    "I sure hope everyones ready for",
    "It's that time again. The time for",
    "Hold the phone! It's",
    "The one and only",
    "*THE* original gangster",
    "Lock your doors and close the curtains, it's",
    "The stage is yours"
  ]
  const names = ["Adam", "Ben", "Phil", "Joe", "Danny", "Keith", "Richard", "Nathan", "Sam", "Alice", "Luke", "Nick", "Dave H", "Dave K", "Hannah", "Audrey", "Katie", "Matt", "Briony", "James", "John", "Patrick", "Rob", "Evan", "Jonny", "Felix", "Vince"];
  const [namesLeft, setNamesLeft] = React.useState(names);
  const [currentName, setCurrentName] = React.useState("");

  const [transitionsEnabled, setTransitionsEnabled] = React.useState(true);
  const segmentSize = 360 / names.length;
  const extraSpins = 5;
  const spinTime = 3;

  const [angle, setAngle] = React.useState(segmentSize / 2);


  const { data } = React.useContext(AppContext)

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
    window.setTimeout(() => {
      setSpinning(false);
      setTransitionsEnabled(false);
      setAngle(targetAngle);
      setCurrentName(name);
      setNamesLeft(_.reject(namesLeft, n => n === name));
    }, spinTime * 1000);
  }

  return (
    <div className="wrapper">
      <div className="wheel-house">
        <div className="wheel" style={{ transitionProperty: transitionsEnabled ? 'all' : 'none', transform: `rotate(${angle}deg)`, transitionDuration: `${spinTime}s` }}>
          {names.map((name, index) =>
            <div className="seg" style={{ transform: `rotate(${segmentSize * index}deg)` }}>
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
        <h2>{_.sample(greetings)}</h2>
        <h1>{currentName}.</h1>
        </>}
        </div>
        <Button pending={spinning} className="shadow bg-brand-primary" onClick={pickName}>SPIN THE WHEEL!</Button>
      </div>
    </div>
  );
}