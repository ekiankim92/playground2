'use client';

import React from 'react';

function ComponentB() {
  console.log('this is component B rendering');

  return (
    <div>
      <div>This is Component B</div>
    </div>
  );
}

// export default React.memo(ComponentB);
export default ComponentB;
