import {useState} from 'react';
import ReactMapGL, {Marker, Popup, Source, Layer} from 'react-map-gl';
import styled from 'styled-components';

import useRacks from '../hooks/useRacks';
import useRoutes from '../hooks/useRoutes';
import useCafes from '../hooks/useCafes';

const Checkboxes = styled.div`
  display: flex;
  margin: 1em;
`;

const CheckboxContainer = styled.div`
  background-color: ${props => props.background || 'black'}; //#BF93E4;
  color: #fff;
  margin: 0 1em 0 1em;
  padding: 0.4em;
  border-radius: 5px;
`;

const cafePointStyle = {
  id: 'point',
  type: 'circle',
  paint: {
    'circle-radius': 10,
    'circle-color': '#8e5b5b'
  }
};

const rackPointStyle = {
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
  const [isCafesDisplayed, setIsCafesDisplayed] = useState(true);

  const {racks, isRacksLoading, isRacksError} = useRacks();
  const {routes, isRoutesLoading, isRoutesError} = useRoutes();
  const {cafes, isCafesLoading, isCafesError} = useCafes();
  console.log(cafes);
  const [selectLocation, setSelectedLocation] = useState({});

  if (isRacksLoading || isRoutesLoading || isCafesLoading)
    return <h2>loaadddingggg</h2>;

  if (isRacksError || isRoutesError || isCafesError)
    return <h2>nooooooooooooo</h2>;

  return (
    <>
      <Checkboxes>
        <CheckboxContainer background="#007cbf">
          <label htmlFor="show_racks_checkbox">Racks</label>
          <input
            type="checkbox"
            name="show_racks_checkbox"
            checked={isRacksDisplayed}
            onChange={e => {
              setIsRacksDisplayed(!isRacksDisplayed);
            }}
          />
        </CheckboxContainer>
        <CheckboxContainer background="#BF93E4">
          <label htmlFor="show_routes_checkbox">Routes</label>
          <input
            type="checkbox"
            name="show_routes_checkbox"
            checked={isRoutesDisplayed}
            onChange={e => {
              setIsRoutesDisplayed(!isRoutesDisplayed);
            }}
          />
        </CheckboxContainer>
        {/* // todo use popup/markers rn so this isnt needed -> */}
        {/* <CheckboxContainer background="#8e5b5b">
          <label htmlFor="show_routes_checkbox">Cafes</label>
          <input
            type="checkbox"
            name="show_cafes_checkbox"
            checked={isCafesDisplayed}
            onChange={e => {
              setIsCafesDisplayed(!isCafesDisplayed);
            }}
          />
        </CheckboxContainer> */}
      </Checkboxes>
      <ReactMapGL
        mapStyle="mapbox://styles/mapbox/streets-v11"
        mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX_KEY}
        {...viewport}
        onViewportChange={nextViewport => setViewport(nextViewport)}
      >
        {isRacksDisplayed ? (
          <Source id="rack-data" type="geojson" data={racks}>
            <Layer {...rackPointStyle} />
          </Source>
        ) : null}

        {isRoutesDisplayed ? (
          <Source id="route-data" type="geojson" data={routes}>
            <Layer {...lineLayerStyle} />
          </Source>
        ) : null}

        {/* {isCafesDisplayed ? (
          <Source id="cafe-data" type="geojson" data={cafes}>
            <Layer {...cafePointStyle} />
          </Source>
        ) : null} */}

        {cafes.cafes.map(location => (
          <div key={location.id}>
            <Marker
              latitude={location.coordinates.latitude}
              longitude={location.coordinates.longitude}
            >
              <a
                onClick={() => {
                  setSelectedLocation(location);
                }}
              >
                <span role="img" aria-label="push-pin">
                  ☕️
                </span>
              </a>
            </Marker>
            {selectLocation.id === location.id ? (
              <Popup
                onClose={() => setSelectedLocation({})}
                closeOnClick={true}
                latitude={location.coordinates.latitude}
                longitude={location.coordinates.longitude}
              >
                {location.name}<br/>
                {location.location.display_address[0]}<br/>
                {location.location.display_address[1]}<br/>
                {location.location.display_address[2]}
              </Popup>
            ) : (
              false
            )}
          </div>
        ))}
      </ReactMapGL>
      {/* <div>{JSON.stringify(cafes.cafes)}</div> */}
    </>
  );
}
