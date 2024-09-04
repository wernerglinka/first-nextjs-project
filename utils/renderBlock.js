import React from 'react';
import components from '../components';

/**
 * render the block type that is passed via the name prop
 */
export default function RenderBlock( { block } ) {
  const { name } = block;
  const Component = components[ name ];
  return ( Component && <Component block={ block } /> );
}
