'use client';

import React from 'react';

function ComponentA() {
  console.log('this is component A rendering!');

  return (
    <div>
      <div>This is Component A</div>
    </div>
  );
}

// export default React.memo(ComponentA);
export default ComponentA;
