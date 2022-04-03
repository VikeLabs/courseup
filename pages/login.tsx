import { useUser, Auth } from '@supabase/supabase-auth-helpers/react'
import { supabase } from '../utils/supabaseClient'
import { useEffect, useState } from 'react'
import { Container } from '@chakra-ui/react'

function UserPage(): JSX.Element {
  const { user, error } = useUser()
  const [data, setData] = useState({})

  useEffect(() => {
    async function loadData() {
      const { data } = await supabase.from('test').select('*')
      setData(data)
    }
    // Only run query once user is logged in.
    if (user) loadData()
  }, [user])

  if (!user)
    return (
      <Container>
        {error && <p>{error.message}</p>}
        <Auth
          // view="update_password"
          supabaseClient={supabase}
          providers={['github']}
          socialLayout="horizontal"
          socialButtonSize="xlarge"
        />
      </Container>
    )

  return (
    <Container>

      <button onClick={() => supabase.auth.signOut()}>Sign out</button>
      <p>user:</p>
      <pre>{JSON.stringify(user, null, 2)}</pre>
      <p>client-side data fetching with RLS</p>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </Container>
  )
}

export default UserPage