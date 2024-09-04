import React, { useEffect } from 'react';
import Markdown from 'markdown-to-jsx';

export default function Image( { image } ) {
  const imagePrefix = process.env.IMAGE_PREFIX;
  const lowResImagesrc = `${ imagePrefix }w_100,c_fill,g_auto,f_auto/${ image.src }`;

  return (
    <figure
      className="responsive-wrapper js-progressive-image-wrapper"
      style={ { paddingBottom: `${ image.aspectRatio }%` } }
    >
      <img className="low-res" src={ lowResImagesrc } alt={ image.alt } />
      <img
        className="high-res"
        src=""
        alt={ image.alt }
        data-prefix={ imagePrefix }
        data-source={ image.src }
      />
      { image.caption && (
        <figcaption>
          <Markdown>{ image.caption }</Markdown>
        </figcaption>
      ) }
    </figure>
  );
}
