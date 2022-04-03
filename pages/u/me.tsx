import { Box } from '@chakra-ui/react';
import { withAuthRequired, User } from '@supabase/supabase-auth-helpers/nextjs';
import Link from 'next/link';

type ProfileProps = { user: User }

export default function Profile({ user }: ProfileProps): JSX.Element {
  return (
    <Box>
      <p>
        [<Link href="/">Home</Link>] | [
        <Link href="/protected-page">supabaseServerClient</Link>]
      </p>
      <div>Hello {user.email}</div>
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </Box>
  );
}

export const getServerSideProps = withAuthRequired();