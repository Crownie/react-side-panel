import React, {FunctionComponent} from 'react';
import styled from 'styled-components';

interface Props {
  onClick:()=>void;
}

const Backdrop: FunctionComponent<Props> = ({onClick}) => {
  return <>
    <BackdropRight$>
      <rect onClick={onClick}/>
    </BackdropRight$>
    <BackdropLeft$>
      <rect onClick={onClick}/>
    </BackdropLeft$>
    <BackdropTop$>
      <rect onClick={onClick}/>
    </BackdropTop$>
    <BackdropTopR$>
      <rect onClick={onClick}/>
    </BackdropTopR$>
    <BackdropBottom$>
      <rect onClick={onClick}/>
    </BackdropBottom$></>;
};
const opacity = 0.2;
const BackdropTop$ = styled.svg`
  position: absolute;
  top: -100vh;
  left: -100vw;
  overflow: visible;
  width: 100vw;

  rect {
    fill: rgba(0, 0, 0, ${opacity});
    height: 100vh;
    width: 100vw;
  }
`;

const BackdropTopR$ = styled.svg`
  position: absolute;
  top: -100vh;
  left: 0;
  overflow: visible;

  rect {
    fill: rgba(0, 0, 0, ${opacity});
    height: 100vh;
    width: 100vw;
  }
`;

const BackdropBottom$ = styled.svg`
  position: absolute;
  bottom: 0;
  left: 0;
  overflow: visible;
  width: 100%;

  rect {
    fill: rgba(0, 0, 0, ${opacity});
    height: 100vh;
    width: 100%;
  }
`;

const BackdropLeft$ = styled.svg`
  position: absolute;
  top: 0;
  left: -100vw;
  overflow: visible;
  width: 100vw;

  rect {
    fill: rgba(0, 0, 0, ${opacity});
    height: 200vh;
    width: 100vw;
  }
`;

const BackdropRight$ = styled.svg`
  position: absolute;
  top: 0;
  right: 0;
  overflow: visible;
  width: 1px;

  rect {
    fill: rgba(0, 0, 0, ${opacity});
    height: 200vh;
    width: 200vw;
  }
`;

export default Backdrop;
