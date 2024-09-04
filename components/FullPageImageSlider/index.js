"use client";

import React, { useEffect } from "react";
import Text from "../Text";
import Image from "../Image";
import debounce from '../../utils/debounce';

const loadImage = ( entries, observer ) => {
  // During initial page load the entries array contains all watched objects. The
  // isIntersecting property for the individual object indicates visibility.
  for ( const entry of entries ) {
    if ( entry.isIntersecting ) {
      const thisWrapper = entry.target;

      // get the dimensions of the image wrapper and the display pixel density
      const imageWidth = thisWrapper.clientWidth;
      const imageHeight = thisWrapper.clientHeight;
      const pixelRatio = window.devicePixelRatio || 1.0;

      // assemble url parameters for the cloudinary image url
      const imageParams = `w_${ 100 * Math.round( ( imageWidth * pixelRatio ) / 100 ) },f_auto`;

      // find the high res image in the wrapper and get the data attributes...
      const thisImage = thisWrapper.querySelector( ".high-res" );
      const thisImagePrefix = thisImage.dataset.prefix;
      const thisImageSource = thisImage.dataset.source;
      // ...so we can assemble and replace the image src url
      thisImage.src = `${ thisImagePrefix }${ imageParams }/${ thisImageSource }`;

      // take this image of the observe list
      observer.unobserve( thisWrapper );

      // once the hi-res image has been loaded, add done class to wrapper
      // which will fade-in the hi-res image and fade-out the low-res image
      thisImage.onload = () => {
        thisWrapper.classList.add( "done" );
      };
    }
  }
};

const updateImage = debounce( function() {
  // images are only loaded when they are visible
  const observer = new IntersectionObserver( loadImage );

  // loop over all image wrappers and add to intersection observer
  const allHiResImageWrappers = document.querySelectorAll( ".js-progressive-image-wrapper" );
  for ( const imageWrapper of allHiResImageWrappers ) {
    observer.observe( imageWrapper );
  }
}, 500 );

export default function FullPageImageSlider( { block } ) {
  // get number of slides
  const slideCount = block.slides.length;

  useEffect( () => {
    // images will update on page load and after a resize
    const resizeObserver = new ResizeObserver( updateImage );
    const resizeElement = document.body;
    resizeObserver.observe( resizeElement );
  }, [] );

  return (
    <div className="block block-full-page-image-slider">
      <div className="slides-container">
        <ul className="slides">
          { block.slides.map( ( slide, i ) => {
            console.log( i );
            return (
              <>
                <li
                  key={ `slide${ i }` }
                  id={ `slide${ i + 1 }` }
                  className={ `slide js-slide ${ slideCount === i + 1 ? 'initial' : '' }` }
                >

                  <Image image={ slide.image } />
                  <div className="slide-content">
                    <Text info={ slide.text } />
                  </div>
                </li>
              </>
            );
          }
          ) }
        </ul>

        <ul className="slides-nav">
          { block.slides.map( ( slide, i ) => {
            return (
              <li
                key={ `nav${ i }` }
                className={ `js-slide-trigger ${ i === 0 ? 'active' : '' }` }
                data-slide-id={ `#slide${ slideCount - i }` }
              ></li>
            );
          } ) }
        </ul>

      </div>
    </div>
  );
}