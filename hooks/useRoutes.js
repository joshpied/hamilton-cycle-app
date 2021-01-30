import useSWR from 'swr';

const fetcher = (...args) => fetch(...args).then(res => res.json());

export default function useRoutes() {
  const {data, error} = useSWR(
    `https://joshpied.github.io/hamilton-cycle/api/routes.geojson`,
    fetcher
  );

  return {
    routes: data,
    isRoutesLoading: !error && !data,
    isRoutesLoading: error
  };
}
