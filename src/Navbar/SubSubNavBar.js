import React from 'react';

function SubSubNavBar({ subItems }) {
  const subItemStyle = {
    color: 'white',
    padding: '5px',
    fontSize: '16px',
  };

  return (
    <div style={{ paddingLeft: '10px', backgroundColor: '#777', borderRadius: '5px' }}>
      {subItems.map((item, idx) => (
        <div key={idx} style={subItemStyle}>
          {item}
        </div>
      ))}
    </div>
  );
}

export default SubSubNavBar;

<SubSubNavBar subItems={['子项1', '子项2', '子项3']} />