import React, {FunctionComponent} from 'react';
import {useSidePanelItem,} from '../../lib';

interface Props {
}

const PageB: FunctionComponent<Props> = () => {
  const {pop} = useSidePanelItem({
    onBeforeExit: (event) => {
      event.preventDefault();
      setTimeout(() => {
        pop(true);
      }, 2000);
    }
  });
  return <div>
    <h1>Hello Page B</h1>
    <button onClick={() => {
      pop();
    }}>&lt;back
    </button>
  </div>;
};

export default PageB;
