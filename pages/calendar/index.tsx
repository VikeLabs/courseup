import { GetServerSideProps } from 'next';
import { getCurrentTerm } from '../../src/lib/utils/terms'

export const getServerSideProps: GetServerSideProps = async () => {
  // note, this will return the current term based on the servers current time.
  return {
    redirect: {
      permanent: false,
      destination: '/calendar/' + getCurrentTerm(),
    },
  };
};

// placeholder for redirect
export default () => { };
