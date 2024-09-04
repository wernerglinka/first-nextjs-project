import React from "react";
import Text from "./Text";
import Image from "./Image";

export default function FullPageImageSlider( { block } ) {
  // get number of slides
  const slideCount = block.slides.length;

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