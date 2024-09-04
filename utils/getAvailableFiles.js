import fs from 'fs';
import matter from 'gray-matter';

/**
 * getAvailableFiles()
 * Reads Markdown files from a specified directory and extracts their front matter
 * data using the gray-matter library. 
 * If pages are build with section components, the front matter data can be used
 * to build the entire page structure.
 */
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