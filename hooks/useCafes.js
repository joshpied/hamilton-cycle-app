import useSWR from 'swr';

const fetcher = (...args) => fetch(...args).then(res => res.json());

export default function useCafes() {
  const {data, error} = useSWR(
    `https://joshpied.github.io/hamilton-cycle/api/cafes.json`,
    fetcher
  );
  console.log(data);

  return {
    cafes: data,
    isCafesLoading: !error && !data,
    isCafesError: error
  };
}
