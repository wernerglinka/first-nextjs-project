import React from 'react';
import components from '../components';

export default function RenderBlock( { block } ) {
  console.log( block );
  const { name } = block;
  const Component = components[ name ];
  return ( Component && <Component block={ block } /> );
}
