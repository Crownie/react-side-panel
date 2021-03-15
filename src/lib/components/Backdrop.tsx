import React, {FunctionComponent} from 'react';
import styled from 'styled-components';

interface Props {
  color?: string;
  onClick: () => void;
}

const Backdrop: FunctionComponent<Props> = ({
  onClick,
  color = 'rgba(0,0,0,0.02)',
}) => {
  return (
    <>
      <BackdropRight$ color={color}>
        <rect onClick={onClick} />
      </BackdropRight$>
      <BackdropLeft$ color={color}>
        <rect onClick={onClick} />
      </BackdropLeft$>
      <BackdropTop$ color={color}>
        <rect onClick={onClick} />
      </BackdropTop$>
      <BackdropTopR$ color={color}>
        <rect onClick={onClick} />
      </BackdropTopR$>
      <BackdropBottom$ color={color}>
        <rect onClick={onClick} />
      </BackdropBottom$>
    </>
  );
};

const BackdropTop$ = styled.svg`
  position: absolute;
  top: -100vh;
  left: -100vw;
  overflow: visible;
  width: 100vw;

  rect {
    fill: ${({color})=>color};
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
    fill: ${({color})=>color};
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
    fill: ${({color})=>color};
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
    fill: ${({color})=>color};
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
    fill: ${({color})=>color};
    height: 200vh;
    width: 200vw;
  }
`;

export default Backdrop;
