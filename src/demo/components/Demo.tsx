import React, {FunctionComponent, useCallback} from 'react';
import styled from 'styled-components';
import {SidePanel, useSidePanel} from '../../lib';
import PageA from './PageA';

interface Props {
}

const Demo: FunctionComponent<Props> = () => {
  const {push, pop, reset} = useSidePanel();

  const handleClick = useCallback(() => {
    push({id:'page1',node:<PageA/>});
  }, [push]);

  const removePage = useCallback(() => {
    pop();
  }, [pop]);

  const handleReset = useCallback(() => {
    reset();
  }, [reset]);

  return <div>
    <Wrapper$>
      <Main$> <p>Normal</p><button onClick={handleClick}>Add page</button>
        <button onClick={removePage}>Remove page</button>
        <button onClick={handleReset}>Reset</button>
      </Main$>
      <SidePanel><De$>Default content</De$></SidePanel>
    </Wrapper$>
  </div>;
};

const Wrapper$ = styled.div`
  display: flex;
  flex-flow: row nowrap;
  height: 100vh;
`

const Main$ = styled.div`
  flex: 1;
`;

const De$ = styled.div`
  position: absolute;
  left:0;
  top:0;
  height: 100%;
  width:100%;
  background-color: #61dafb;
`;

export default Demo;
