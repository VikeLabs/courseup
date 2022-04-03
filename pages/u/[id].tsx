import { useRouter } from 'next/router';

export function ProfilePage() {
  const router = useRouter();
  const { id } = router.query;
  return <div>profile: {id}</div>;
}

export default ProfilePage;
