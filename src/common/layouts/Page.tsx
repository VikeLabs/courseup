import { PropsWithChildren, useEffect, useState } from 'react';

import { Flex } from '@chakra-ui/react';
import { Helmet } from 'react-helmet';
import { useLocation, useMatch, useNavigate, useParams } from 'react-router';
import { Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import '../../index.css';

import { useSessionStorage } from 'lib/hooks/storage/useSessionStorage';
import { useSmallScreen } from 'lib/hooks/useSmallScreen';
import { isMobile } from 'lib/utils/mobile';
import { getCurrentTerm } from 'lib/utils/terms';

import { Header } from 'common/header';
import { Sidebar } from 'common/layouts/sidebar/containers/Sidebar';
import { SearchResults } from 'common/layouts/sidebar/variants/SearchResults';
import { Mobile } from 'common/mobile';

type Props = {
  title?: string;
  leftSidebar?: JSX.Element;
  rightSidebar?: JSX.Element;
  mobileSupport?: boolean;
};

const MobilePage = ({
  query,
  leftSidebar,
  rightSidebar,
  children,
}: {
  query: string;
  leftSidebar?: JSX.Element;
  rightSidebar?: JSX.Element;
  children?: React.ReactNode;
}): JSX.Element => {
  const [swiper, setSwiper] = useState(null);

  useEffect(() => {
    if (query.length > 0 && swiper) {
      //@ts-ignore
      swiper.slideTo(0);
    }
  }, [query, swiper]);

  return (
    <Swiper
      modules={[Pagination]}
      pagination={{
        clickable: true,
      }}
      initialSlide={1}
      //@ts-ignore
      onSwiper={(swiper) => setSwiper(swiper)}
    >
      {query.length > 0 ? (
        <SwiperSlide>
          <SearchResults />
        </SwiperSlide>
      ) : (
        leftSidebar && <SwiperSlide>{leftSidebar}</SwiperSlide>
      )}
      <SwiperSlide style={{ overflowY: 'scroll', width: '100vw' }}>{children}</SwiperSlide>
      {rightSidebar && <SwiperSlide>{rightSidebar}</SwiperSlide>}
    </Swiper>
  );
};

export function Page({ title, leftSidebar, rightSidebar, mobileSupport, children }: PropsWithChildren<Props>) {
  const [query, setQuery] = useState('');
  const [savedTerm, setSavedTerm] = useSessionStorage('user:term', getCurrentTerm());
  const navigate = useNavigate();
  const location = useLocation();
  const { term, slug } = useParams();
  const smallScreen = useSmallScreen();

  const route = location.pathname.split('/')[1];

  const handleSearchChange = (q: string) => {
    setQuery(q);
  };

  const contest = useMatch('/contest');
  useEffect(() => {
    if (term) {
      setSavedTerm(term);
    } else if (route && !slug && !contest) {
      navigate(`/${route}/${savedTerm}`, { replace: true });
    }
  }, [navigate, route, savedTerm, setSavedTerm, term, slug, contest]);

  return (
    <>
      {!mobileSupport && <Mobile />}
      <Flex h={smallScreen ? window.innerHeight : '100vh'} direction="column" overflowX="hidden" overflowY="hidden">
        <Helmet>
          <title>{title}</title>
        </Helmet>
        <Header onSearchChange={handleSearchChange} />
        <Flex overflowY="auto" h="100%">
          {smallScreen ? (
            <MobilePage query={query} leftSidebar={leftSidebar} rightSidebar={rightSidebar} children={children} />
          ) : (
            <>
              {query.length > 0 ? (
                <Sidebar>
                  <SearchResults />
                </Sidebar>
              ) : (
                leftSidebar && <Sidebar>{leftSidebar}</Sidebar>
              )}
              <Flex overflowY="auto" zIndex={56} w="100%" justifyContent="center" boxShadow="md">
                {children}
              </Flex>
              {rightSidebar && !isMobile && <Sidebar>{rightSidebar}</Sidebar>}
            </>
          )}
        </Flex>
      </Flex>
    </>
  );
}
