import Head from 'next/head';
import dynamic from 'next/dynamic';
import styled from 'styled-components';
import {useEffect, useState} from 'react';

const Map = dynamic(() => import('../components/Map'), {
  loading: () => 'Loading...',
  ssr: false
});

// const fetcher = (...args) => fetch(...args).then(res => res.json())

// export async function getStaticProps() {
//   const res = await fetch('https://joshpied.github.io/hamilton-cycle/api/racks.geojson');
//   const racks = await res.json();

//   return {
//     props: {
//       racks
//     }
//   };
// }

export default function HomePage(props) {
  
  return (
    <>
      <Head>
        <title>Hamilton Cycle</title>
        <link href='https://api.mapbox.com/mapbox-gl-js/v1.12.0/mapbox-gl.css' rel='stylesheet' />
      </Head>
      <Container>
        <H1>Hamilton Cycle</H1>
        <Map />
      </Container>
    </>
  );
}

const H1 = styled.h1`
  font-size: 2rem;
  font-style: italic;
  color: blueviolet;
`;

const Container = styled.div`
  width: 100vw;
  height: 85vh;
`;
