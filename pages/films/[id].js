// Import the useRouter hook from Next.js for routing within the application.
import { useRouter } from 'next/router';

// Import useSWR, a React hook for data fetching.
import useSWR from 'swr';

// Import React, the library used to build the component.
import React from 'react';

// Import Link from Next.js to enable client-side transitions between routes.
import Link from 'next/link';

// Import the global CSS styles that apply to the entire application.
import "../../src/app/globals.css"

// Define a fetcher function that fetches data from a URL and returns the response as JSON.
const fetcher = url => fetch(url).then(res => res.json());

// Define the Film component as the default export of this module.
export default function Film() {
  // Use the useRouter hook to access the router object.
  const router = useRouter();

  // Extract the 'id' parameter from the URL query string.
  const { id } = router.query;

  // Use the useSWR hook to fetch film data based on the 'id'. If 'id' is undefined, the URL is null.
  const { data, error } = useSWR(id ? `https://swapi.dev/api/films/${id}` : null, fetcher);

  // Conditionally render a div element if there's an error in fetching data.
  if (error) return <div>Failed to load.</div>

  // Show a loading message while waiting for data to be fetched.
  if (!data) return <div>Loading...</div>

  // Render the film details if data is successfully fetched and available.
  return (
    <div className='filmInfo'>
      {/* Display the title of the film in an h1 element with a class for styling.*/}
      <h1 className='filmTitle'>{data.title}</h1>
      
      {/* Display the opening crawl (introductory text) of the film in a paragraph.*/}
      <p className='storyLine'>{data.opening_crawl}</p>
      
      {/* Display the director's name.*/}
      <p><strong>Director:</strong> {data.director}</p>
      
      {/* Display the producer's name.*/}
      <p><strong>Producer:</strong> {data.producer}</p>
      
      {/* Display the release date of the film.*/}
      <p><strong>Release Date:</strong> {data.release_date}</p>
      
      {/* Use a Link component to create a client-side link back to the home page.*/}
      <Link href='/'>
        {/* Render a button within the Link, styled with a class, to navigate back home.*/}
        <button type="button" className="backHomeBtn">Home</button>
      </Link>
    </div>
  );
}
