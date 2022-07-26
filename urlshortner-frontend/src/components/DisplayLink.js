import React from 'react';
import { Link } from '@material-ui/core';

const DisplayLink = ({ shortend }) => {
  return (
    <div>
      <Link rel='noopener' target='_blank' href={`${shortend}`}>
        {shortend}
      </Link>
    </div>
  );
};

export default DisplayLink;
