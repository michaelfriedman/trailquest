import React from 'react';
import FontAwesome from 'react-fontawesome';

const Loading = () => <div>
  <FontAwesome
    className="fa fa-spinner"
    name="spinner"
    size="5x"
    spin
    style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
  />
</div>;

export default Loading;
