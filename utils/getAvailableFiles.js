import fs from 'fs';
import matter from 'gray-matter';

export default function getAvailableFiles( dir ) {
  const files = fs.readdirSync( dir );
  const mdPages = files.filter( file => file.endsWith( '.md' ) );

  const pagesData = mdPages.map( ( pageName ) => {
    const pageContent = fs.readFileSync( `${ dir }/${ pageName }`, 'utf8' );
    const { data } = matter( pageContent );
    return data;
  } );

  return pagesData;
}