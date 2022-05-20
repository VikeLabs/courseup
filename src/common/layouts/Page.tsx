import { PropsWithChildren, useEffect, useState } from 'react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

import {
  Flex,
  //HStack,
  useMediaQuery,
  //VStack,
  // Drawer,
  // DrawerBody,
  // DrawerFooter,
  // DrawerHeader,
  // DrawerOverlay,
  // DrawerContent,
  // DrawerCloseButton,
  // useDisclosure,
} from '@chakra-ui/react';
import { Helmet } from 'react-helmet';
import { useLocation, useMatch, useNavigate, useParams } from 'react-router';
import { Swiper, SwiperSlide } from 'swiper/react';

import { useSessionStorage } from 'lib/hooks/storage/useSessionStorage';
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

export function Page({ title, leftSidebar, rightSidebar, mobileSupport, children }: PropsWithChildren<Props>) {
  const [query, setQuery] = useState('');
  const [savedTerm, setSavedTerm] = useSessionStorage('user:term', getCurrentTerm());
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobile] = useMediaQuery('(max-width: 1020px)');
  const { term, slug } = useParams();
  //const { isOpen, onOpen, onClose } = useDisclosure();

  const route = location.pathname.split('/')[1];

  const pagination = {
    el: 'swiper-pagination',
    clickable: true,
    renderBullet: () => <span>' + (index + 1) + '</span>,
  };

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
      <Flex h="100vh" direction="column" overflowX="hidden" overflowY="hidden">
        <Helmet>
          <title>{title}</title>
        </Helmet>
        <Header onSearchChange={handleSearchChange} />

        {/* <Flex overflowY="auto" h="100%">
          {!isMobile ? (
            <>
              {query.length > 0 ? (
                <Sidebar side="left">
                  <SearchResults />
                </Sidebar>
              ) : (
                leftSidebar && <Sidebar side="left">{leftSidebar}</Sidebar>
              )}
              <Flex overflowY="auto" zIndex={56} w="100%" justifyContent="center" boxShadow="md">
                {children}
              </Flex>
              {rightSidebar && <Sidebar side="right">{rightSidebar}</Sidebar>}
            </>
          ) : (
            <>
              <VStack w="100%" spacing={5} pt={5} minH="100vh">
                <HStack px={5} w="100%" justify="space-between">
                  {query.length > 0 ? (
                    <Sidebar side="left" title="Search Results">
                      <SearchResults />
                    </Sidebar>
                  ) : (
                    leftSidebar && <Sidebar side="left">{leftSidebar}</Sidebar>
                  )}
                  {rightSidebar && <Sidebar side="right">{rightSidebar}</Sidebar>}
                </HStack>
                <Flex overflowY="auto" zIndex={56} w="100%" justifyContent="center" boxShadow="md">
                  {children}
                </Flex>
              </VStack>
            </>
          )}
        </Flex> */}

        {/* No mobile support */}
        {/* {!isMobile && query.length > 0 ? (
          <Sidebar>
            <SearchResults />
          </Sidebar>
        ) : (
          leftSidebar && !isMobile && <Sidebar>{leftSidebar}</Sidebar>
        )}
        <Flex overflowY="auto" zIndex={56} w="100%" justifyContent="center" overflowX="hidden" boxShadow="md">
          {isMobile && query.length > 0 ? (
            <Sidebar>
              <SearchResults />
            </Sidebar>
          ) : (
            children
          )}
        </Flex>
        {rightSidebar && !isMobile && <Sidebar>{rightSidebar}</Sidebar>} */}

        {/* Vanilla CSS mobile support */}
        {/* <Flex>
          {isMobile ? (
            <Flex scrollSnapType="x mandatory" overflowX="scroll">
              <Box scrollSnapAlign="start" minW="100%" overflowY="scroll">
                {query.length > 0 ? (
                  <Sidebar>
                    <SearchResults />
                  </Sidebar>
                ) : (
                  leftSidebar && <Sidebar>{leftSidebar}</Sidebar>
                )}
              </Box>
              <Flex
                scrollSnapAlign="start"
                overflowY="auto"
                zIndex={56}
                minW="100%"
                minH="100%"
                justifyContent="center"
                boxShadow="md"
              >
                {children}
              </Flex>
              <Box minW="100%" scrollSnapAlign="start" overflowY="scroll">
                {rightSidebar && <Sidebar>{rightSidebar}</Sidebar>}
              </Box>
            </Flex>
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
        </Flex> */}

        {/* Swiper mobile support */}
        <Flex overflowY="auto" h="100%" w="100%">
          {isMobile ? (
            <Swiper pagination={pagination} initialSlide={1}>
              {query.length > 0 ? (
                <SwiperSlide>
                  <SearchResults />
                </SwiperSlide>
              ) : (
                leftSidebar && <SwiperSlide>{leftSidebar}</SwiperSlide>
              )}
              <SwiperSlide style={{ width: '100%' }}>{children}</SwiperSlide>
              {rightSidebar && <SwiperSlide>{rightSidebar}</SwiperSlide>}
            </Swiper>
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
