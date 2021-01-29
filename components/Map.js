import {useState} from 'react';
import ReactMapGL, {Marker, Popup, Source, Layer} from 'react-map-gl';

import useRacks from '../hooks/useRacks';
import useRoutes from '../hooks/useRoutes';

// const geojson = {
//   type: 'FeatureCollection',
//   features: [
//     {type: 'Feature', geometry: {type: 'Point', coordinates: [-122.4, 37.8]}}
//   ]
// };

const pointLayerStyle = {
  id: 'point',
  type: 'circle',
  paint: {
    'circle-radius': 10,
    'circle-color': '#007cbf'
  }
};

const lineLayerStyle = {
  id: 'LineString',
  type: 'line',
  source: 'LineString',
  layout: {
    'line-join': 'round',
    'line-cap': 'round'
  },
  paint: {
    'line-color': '#BF93E4',
    'line-width': 5
  }
};
var geojson = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      geometry: {
        type: 'LineString',
        properties: {},
        coordinates: [
          [-77.0366048812866, 38.89873175227713],
          [-77.03364372253417, 38.89876515143842],
          [-77.03364372253417, 38.89549195896866],
          [-77.02982425689697, 38.89549195896866],
          [-77.02400922775269, 38.89387200688839],
          [-77.01519012451172, 38.891416957534204],
          [-77.01521158218382, 38.892068305429156],
          [-77.00813055038452, 38.892051604275686],
          [-77.00832366943358, 38.89143365883688],
          [-77.00818419456482, 38.89082405874451],
          [-77.00815200805664, 38.88989712255097]
        ]
      }
    }
  ]
};

export default function Map() {
  const [viewport, setViewport] = useState({
    width: '100%',
    height: '100%',
    // The latitude and longitude of the center of Hamilton
    latitude: 43.2557,
    longitude: -79.8711,
    zoom: 11
  });

  const [isRacksDisplayed, setIsRacksDisplayed] = useState(false);
  const [isRoutesDisplayed, setIsRoutesDisplayed] = useState(true);

  const {racks, isRacksLoading, isRacksError} = useRacks();
  const {routes, isRoutesLoading, isRoutesError} = useRoutes();

  if (isRacksLoading || isRoutesError) return <h2>loaadddingggg</h2>;
  if (isRacksError || isRoutesError) return <h2>nooooooooooooo</h2>;
  return (
    <>
      <label htmlFor="show_racks_checkbox">Racks</label>   
      <input type="checkbox" name="show_racks_checkbox" checked={isRacksDisplayed} onChange={e => {setIsRacksDisplayed(!isRacksDisplayed)}} />
      <label htmlFor="show_routes_checkbox">Routes</label>   
      <input type="checkbox" name="show_routes_checkbox" checked={isRoutesDisplayed} onChange={e => {setIsRoutesDisplayed(!isRoutesDisplayed)}} />
      <ReactMapGL
        mapStyle="mapbox://styles/mapbox/streets-v11"
        mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX_KEY}
        {...viewport}
        onViewportChange={nextViewport => setViewport(nextViewport)}
      >
        {isRacksDisplayed ? (
          <Source id="rack-data" type="geojson" data={racks}>
            <Layer {...pointLayerStyle} />
          </Source>
        ) : null}

        {isRoutesDisplayed ? (
          <Source id="route-data" type="geojson" data={routes}>
            <Layer {...lineLayerStyle} />
          </Source>
        ) : null}
      </ReactMapGL>
      <div>{JSON.stringify(routes)}</div>
    </>
  );
}
