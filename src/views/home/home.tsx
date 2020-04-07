import * as React from "react";
import { Button } from "@rocketmakers/armstrong";
import { RouteComponentProps } from 'react-router';

import "./home.scss";
import { AppContext } from '../shell';

export const HomeView: React.FunctionComponent<RouteComponentProps> = props => {
  const names = ["Adam", "Ben", "Phil", "Joe", "Adam", "Ben", "Phil", "Joe"];
  const [transitionsEnabled, setTransitionsEnabled] = React.useState(true);
  const segmentSize = 360/names.length;
  const extraSpins = 3;
  const spinTime = 3;

  const [angle, setAngle] = React.useState(0);


  const { data } = React.useContext(AppContext)


  const spinarooni = () => {
    setTransitionsEnabled(true);
    const offset = segmentSize/2;
    const personAngle = segmentSize;
    const index = names.length - 2;
    const targetAngle = (personAngle * index)+ offset;
    setAngle(targetAngle + (360 * extraSpins));
    window.setTimeout(() => {
      setTransitionsEnabled(false);
      setAngle(targetAngle);
    }, spinTime*1000);
  }

  return (
    <div>
      <div className="wheel" style={{ transition: transitionsEnabled ? 'all' : 'none', transform: `rotate(${angle}deg)`, transitionDuration: `${spinTime}s`}}>
        {names.map((name, index) => <div className="seg" style={{transform: `rotate(${segmentSize*index}deg)`}}>
          <label style={{transform: `translateY(-50%) rotate(${segmentSize / 2}deg)`}}>{name}</label>
        </div>)}
        <div className="center"/>
      </div>
      <Button onClick={spinarooni}>SPIN THE WHEEL!</Button>
    </div>
  );
}