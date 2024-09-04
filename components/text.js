import React from 'react';
import Markdown from 'markdown-to-jsx';
import RenderTitle from '../utils/renderTitle';

export default function Text( { info } ) {
  return (
    <>
      { info.prefix && <p className="prefix">{ info.prefix }</p> }

      { info.title && <RenderTitle title={ info.title } tag={ info.header } /> }

      { info.subTitle && <p className="sub-title">{ info.subTitle }</p> }

      { info.prose && <div className="content"><Markdown>{ info.prose }</Markdown></div> }
    </>
  );
}