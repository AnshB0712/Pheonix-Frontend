/* eslint-disable react/destructuring-assignment */
import { Text } from '@mantine/core';
import React from 'react';
import EmptyStateComponent from './EmptyStateComponent';

function DisplayData({ data, Component, componentProps }) {
  if (!data) { return <EmptyStateComponent index={'1'}/> }

  if (!data.length) { return <EmptyStateComponent index={'0'}/> }

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    data.map((props, i) => <Component key={props?._id || i} {...props} {...componentProps} />)
  );
}

export default DisplayData;
