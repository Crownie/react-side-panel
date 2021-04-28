import React, { FunctionComponent } from 'react';
import { useSidePanelItem } from '../../lib';
import PageB from './PageB';

interface Props {
}

const PageA: FunctionComponent<Props> = () => {
  const { pop, push } = useSidePanelItem({
    onBeforeExit: () => {
      console.log('On Page A Exit');
    }
  });
  return <div>
    <h1>Hello Page A</h1>

    <button onClick={() => {
      pop();
    }}>&lt;back
    </button>

    <button onClick={() => {
      push({ id: 'pageB', node: <PageB />, modal: true });
    }}>Page B
    </button>
  </div>;
};

export default PageA;
