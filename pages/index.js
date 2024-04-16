// Import Link from Next.js to enable client-side transitions between routes.
import Link from 'next/link';

// Import useSWR, a React hook for data fetching with built-in caching and revalidation.
import useSWR from 'swr';

// Import React, the library used to build the component.
import React from 'react';

// Import global CSS styles that apply to the entire application.
import "../src/app/globals.css"

// Define a fetcher function that makes an HTTP request to a given URL and returns the response as JSON.
const fetcher = url => fetch(url).then(res => res.json());

// Define the Home component as the default export of this module.
export default function Home() {
  // Use the useSWR hook to fetch data from the Star Wars API, specifically the films endpoint.
  const { data, error } = useSWR('https://swapi.dev/api/films', fetcher);

  // Conditionally render a div element if there's an error in fetching data.
  if (error) return <div>Failed to load films.</div>;

  // Display a loading message while waiting for the data to be fetched.
  if (!data) return <div>Loading...</div>;

  // Render the main component structure if data is successfully fetched and available.
{/* Display the title "Star Wars Films" in a header element, styled with a class for specific styling.*/}
 {/* Use an unordered list to list the films, applying a class for styling.*/}
  {/* Map over the array of films received from the API and render each film as a list item.*/}
{/* Each list item is given a unique key for React's reconciliation process, and is styled with a class.*/}
 {/*Wrap the film title in a Link component to make it a clickable link that routes to the detail view of the film.*/}
  return (
    <div>
      
      <h1 className='titleHeader'>Star Wars Films</h1>

     
      <ul className='homeList'>
      
        {data.results.map(film => (
          
          <li className='filmList' key={film.episode_id}>
           
            <Link href={`/films/${film.episode_id}`}>{film.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
