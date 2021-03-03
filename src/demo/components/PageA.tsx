import React, {FunctionComponent} from 'react';
import {useSidePanel} from '../../lib';
import PageB from './PageB';

interface Props {}

const PageA: FunctionComponent<Props> = () => {
  const {pop, resetTo} = useSidePanel();
  return <div>
    <h1>Hello Page A</h1>

    <button onClick={()=>{
      pop();
    }}>&lt;back</button>

    <button onClick={()=>{
      resetTo({id:'pageB',node:<PageB/>, modal:true});
    }}>Page B</button>
  </div>;
};

export default PageA;
