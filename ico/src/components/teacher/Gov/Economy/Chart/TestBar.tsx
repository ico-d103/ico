import React from 'react'
import { ResponsiveBar } from '@nivo/bar';

function TestBar() {
    const data = [
        { country: 'A', value: 10 },
        { country: 'B', value: 20 },
        { country: 'C', value: 15 },
      ];
    
      return (
        <div style={{ height: '400px' }}>
          <ResponsiveBar data={data} keys={['value']} indexBy="country" />
        </div>
      );
    };

export default TestBar