import { notFound } from 'next/navigation';
import getAvailableFiles from "../../utils/getAvailableFiles";
import SectionContainer from "../../utils/renderPageSection";

/**
 * The generateStaticParams function is used in combination with dynamic route
 * segments to statically generate routes at build time instead of on-demand 
 * at request time.
 */
export const generateStaticParams = async () => {
  const validPages = getAvailableFiles( 'pages' );
  return validPages.map( page => ( { slug: page.slug }
  ) );
};

/**
 * Page metadata is fetched from the source markdown file and then returned
 * as a Metadata object.
 * 
 * TODO:  Add seo/social parameters
 */
export async function generateMetadata( { params, searchParams }, parent ) {
  // get the slug from the route params
  const slug = params.slug;

  // check if the route represents a page
  const validPages = getAvailableFiles( 'pages' );
  const isValidPage = validPages.some( page => page.slug === slug );
  if ( !isValidPage ) {
    return {
      title: "404",
      description: "Page does not exist",
    };
  }

  // return metadata
  const pageMetadata = validPages.find( page => page.slug === slug );

  return {
    title: pageMetadata.title,
    description: pageMetadata.description,
  };
}

export default function Global( { params } ) {
  // The name of the page is passed as a parameter to the page component
  const slug = params.slug;

  // get the available pages
  const validPages = getAvailableFiles( 'pages' );

  // check if page slug is valid
  const isValidPage = validPages.some( page => page.slug === slug );

  // if page is not valid display 404 page
  if ( !isValidPage ) {
    notFound();
  }

  // get the page frontmatter identified by it slug
  const pageFrontmatter = validPages.find( page => page.slug === slug );
  const pageSections = pageFrontmatter.sections;

  // render the page sections
  return (
    <main>
      { pageSections &&
        pageSections.map( ( section, i ) => {
          return <SectionContainer key={ i } section={ section } />;
        } ) }
    </main>
  );
}