import useSWR from 'swr';

const fetcher = (...args) => fetch(...args).then(res => res.json());

export default function useRacks() {
  const {data, error} = useSWR(
    `https://joshpied.github.io/hamilton-cycle/api/racks.geojson`,
    fetcher
  );

  return {
    racks: data,
    isRacksLoading: !error && !data,
    isRacksError: error
  };
}
