import { GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    redirect: {
      permanent: false,
      // TODO: make this the current term based on date.
      destination: '/calendar/202205',
    },
  };
};

// placeholder for redirect
export default () => {};
