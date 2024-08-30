import React from 'react';

import RenderBlock from './renderBlock';

/**
 * SectionContainer
 * Builds a page section container with columns and blocks
 * The section tag may be `section`, `article`, `aside`, or `div` and is defined
 * section.container.
 * A page section may have an id, classes, and styles.
 * The section may contain one or more columns, which each column containing one
 * or more blocks.
 */
export default function SectionContainer( { section } ) {
  const { container: Container, containerFields, columns } = section;

  // build the section container classes string
  let sectionClasses = 'block-wrapper';
  if ( containerFields.containerClass ) {
    sectionClasses += ` ${ containerFields.containerClass }`;
  }
  if ( containerFields.inContainer ) {
    sectionClasses += ` inContainer`;
  }
  if ( containerFields.background.isDark ) {
    sectionClasses += ` isDark`;
  }

  // build the section container ID string
  const sectionId = containerFields.containerId ?? '';

  // build the section container styles string
  let sectionStyles = {};
  if ( containerFields.background.color ) {
    sectionStyles[ 'backgroundColor' ] = containerFields.background.color;
  }
  if ( containerFields.background.image ) {
    sectionStyles[ 'backgroundImage' ] = `url(${ containerFields.background.image });`;
  }

  // get length of columns
  const columnLength = columns.length;

  return (
    <Container
      className={ sectionClasses }
      id={ sectionId ? sectionId : undefined }
      style={ sectionStyles ? sectionStyles : undefined }
    >
      <div className={ `columns cols${ columnLength }` }>
        { columns.map( ( column, i ) => {
          return (
            <div className="column" key={ i }>
              { column.blocks.map( ( block, j ) => {
                return <RenderBlock key={ j } block={ block } />;
              } ) }
            </div>
          );
        } ) }
      </div>
    </Container>
  );
}