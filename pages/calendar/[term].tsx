import { useRouter } from 'next/router';

export function Calendar() {
  const router = useRouter();
  const { term } = router.query;
  return <div>term: {term}</div>;
}

export default Calendar;
