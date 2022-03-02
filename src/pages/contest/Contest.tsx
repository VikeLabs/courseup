import { useEffect } from 'react';

import { ArrowRightIcon, ExternalLinkIcon } from '@chakra-ui/icons';
import { Box, Button, Container, Heading, Image, Link, ListItem, Text, UnorderedList, VStack } from '@chakra-ui/react';
import { useSearchParams } from 'react-router-dom';

import { usePostEvent } from 'lib/fetchers';
import { useDarkMode } from 'lib/hooks/useDarkMode';

import { Page } from 'common/layouts/Page';

import { Countdown } from './components/Countdown';
import { useCountdown } from './hooks/useCountdown';

export function Contest() {
  const [{ days, hours, minutes, seconds }] = useCountdown();
  const { mutate } = usePostEvent({});
  const mode = useDarkMode();
  const [searchParams] = useSearchParams();
  const from = searchParams.get('from');
  useEffect(() => {
    mutate({ name: 'contest page visit', params: { from } });
  }, [from, mutate]);

  return (
    <Page title="Logo contest" mobileSupport>
      <Container maxW="container.lg" my="1.25em">
        <VStack pb={{ base: '7em', sm: '2em' }}>
          <Image alt="logo contest graphic" src={process.env.PUBLIC_URL + '/assets/contest/heading_card.svg'} />
          <Text>
            <Link href="#outline" color={mode('teal.500', 'teal.300')}>
              Outline
            </Link>{' '}
            |{' '}
            <Link href="#requirements" color={mode('teal.500', 'teal.300')}>
              Requirements
            </Link>{' '}
            |{' '}
            <Link href="#prizing" color={mode('teal.500', 'teal.300')}>
              Prizing
            </Link>{' '}
            |{' '}
            <Link href="#submit" color={mode('teal.500', 'teal.300')}>
              Submit
            </Link>{' '}
          </Text>
          <Box id="outline">
            <Heading>Outline</Heading>
            <Text>
              We are looking for a logo designed by you! Win cool prizes and get the chance to have your logo
              permanently featured on this very website. Keep reading to get more details about rules, prizing, and how
              to submit.
              <br /> If you have any questions direct them to{' '}
              <Link
                href="mailto:courseup@vikelabs.ca?subject=CourseUp Logo Contest"
                color={mode('teal.500', 'teal.300')}
              >
                courseup@vikelabs.ca
              </Link>
              .
            </Text>
          </Box>
          <Box id="requirements">
            <Heading>Requirements</Heading>
            <Text>
              Below are a list of requirements for the contest. All submissions must meet every requirement in order to
              be considered for prizing.
            </Text>
            <UnorderedList>
              <ListItem>
                The submission{' '}
                <Text as="span" fontWeight="bold" fontStyle="italic">
                  must
                </Text>{' '}
                come from a current UVic student or alumni{' '}
              </ListItem>
              <ListItem>
                The submission{' '}
                <Text as="span" fontWeight="bold" fontStyle="italic">
                  must
                </Text>{' '}
                not primarily use colours associated with UVic or UVic Edge branding
              </ListItem>
              <ListItem>
                The submission
                <Text as="span" fontWeight="bold" fontStyle="italic">
                  {' '}
                  must not
                </Text>{' '}
                use colours associated with a particular faculty or regalia
              </ListItem>
            </UnorderedList>
          </Box>
          <Box id="prizing">
            <Heading>Prizing</Heading>
            <Text>
              There are three different categories for which submissions will be judged on. All submissions will be
              pooled together and judges will split them into their respective categories once submissions close.
            </Text>
            <Heading size="lg" my=".25em">
              Categories
            </Heading>
            <VStack className="categories" spacing=".5em">
              <Box className="best-overall">
                <Heading size="md">Best Overall</Heading>
                <Text>
                  The best overall submission will be voted on by the CourseUp team. This will be the logo that the team
                  feels is best designed and most suitable for the website. The prizes you can win are:
                </Text>
                <UnorderedList>
                  <ListItem>
                    One of the following items:{' '}
                    <UnorderedList>
                      <ListItem>
                        <Link
                          isExternal
                          color={mode('teal.500', 'teal.300')}
                          href="https://www.fjallraven.com/ca/en-ca/bags-gear/kanken/kanken-bags/kanken-mini?_t_q=&_t_hit.id=Luminos_Storefront_Web_Features_Catalog_Product_Domain_CommonProduct"
                        >
                          Fjällräven backpack <ExternalLinkIcon mx="2px" />
                        </Link>
                      </ListItem>
                      <ListItem>
                        <Link
                          isExternal
                          color={mode('teal.500', 'teal.300')}
                          href="https://www.amazon.ca/Soundcore-Bluetooth-Diaphragm-Technology-Waterproof/dp/B08BCHKY52/ref=sr_1_9?crid=BKMZ3PMFN72S&keywords=bluetooth+speaker+anker&qid=1645833031&sprefix=bluetooth+speaker+anke%2Caps%2C152&sr=8-9"
                        >
                          Soundcore Bluetooth speaker
                          <ExternalLinkIcon mx="2px" />
                        </Link>
                      </ListItem>
                      <ListItem>Whatever else you might need!</ListItem>
                    </UnorderedList>
                  </ListItem>
                  <ListItem>VikeLabs t-shirt and stickers</ListItem>
                  <ListItem>Attribution on the CourseUp website and GitHub repository</ListItem>
                  <ListItem>Campus-wide bragging rights</ListItem>
                </UnorderedList>
              </Box>
              <Box className="most-creative">
                <Heading size="md">Most Creative</Heading>
                <Text>
                  The most creative submission will be voted on by the entire VikeLabs club (not just the CourseUp
                  team). This design can also be the best overall or best meme, but we will be looking for a design that
                  steps outside the box and doesn’t need to necessarily meet the “corporate” logo feel.
                </Text>
                <UnorderedList>
                  <ListItem>
                    One of the following items:{' '}
                    <UnorderedList>
                      <ListItem>
                        <Link
                          isExternal
                          color={mode('teal.500', 'teal.300')}
                          href="https://www.hydroflask.com/24-oz-standard-mouth-with-flex-straw-cap?color=starfish"
                        >
                          Hydro Flask water bottle
                          <ExternalLinkIcon mx="2px" />
                        </Link>
                      </ListItem>
                      <ListItem>
                        <Link
                          isExternal
                          color={mode('teal.500', 'teal.300')}
                          href="https://www.bestbuy.ca/en-ca/product/amazon-echo-dot-3rd-gen-smart-speaker-with-bluetooth-mesh-smart-led-light-bulb-charcoal/B0015627"
                        >
                          Amazon Echo Dot
                          <ExternalLinkIcon mx="2px" />
                        </Link>
                      </ListItem>
                      <ListItem>
                        <Link
                          isExternal
                          color={mode('teal.500', 'teal.300')}
                          href="https://www.amazon.ca/Bluetooth-Anker-SoundCore-Dual-Driver-Distortion/dp/B016XTADG2/ref=sr_1_6?crid=BKMZ3PMFN72S&keywords=bluetooth+speaker+anker&qid=1645832949&sprefix=bluetooth+speaker+anke%2Caps%2C152&sr=8-6"
                        >
                          Anker Bluetooth Speaker
                          <ExternalLinkIcon mx="2px" />
                        </Link>
                      </ListItem>
                      <ListItem>Whatever else you might need!</ListItem>
                    </UnorderedList>
                  </ListItem>
                  <ListItem>VikeLabs stickers</ListItem>
                </UnorderedList>
              </Box>
              <Box className="fan-favourite">
                <Heading size="md">Fan Favourite</Heading>
                <Text>
                  Not an artist? This category is for you! If you just want a chance to win a cool prize, this category
                  is for the fan favourite submission. Whether it’s a meme or “CourseUp” written in comic sans, the
                  winner will be determined based on a public voting process (details to come).
                </Text>
                <UnorderedList>
                  <ListItem>
                    One of the following items:{' '}
                    <UnorderedList>
                      <ListItem>
                        <Link
                          isExternal
                          color={mode('teal.500', 'teal.300')}
                          href="https://www.hydroflask.com/24-oz-standard-mouth-with-flex-straw-cap?color=starfish"
                        >
                          Hydro Flask water bottle
                          <ExternalLinkIcon mx="2px" />
                        </Link>
                      </ListItem>
                      <ListItem>
                        <Link
                          isExternal
                          color={mode('teal.500', 'teal.300')}
                          href="https://www.bestbuy.ca/en-ca/product/amazon-echo-dot-3rd-gen-smart-speaker-with-bluetooth-mesh-smart-led-light-bulb-charcoal/B0015627"
                        >
                          Amazon Echo Dot
                          <ExternalLinkIcon mx="2px" />
                        </Link>
                      </ListItem>
                      <ListItem>
                        <Link
                          isExternal
                          color={mode('teal.500', 'teal.300')}
                          href="https://www.amazon.ca/Bluetooth-Anker-SoundCore-Dual-Driver-Distortion/dp/B016XTADG2/ref=sr_1_6?crid=BKMZ3PMFN72S&keywords=bluetooth+speaker+anker&qid=1645832949&sprefix=bluetooth+speaker+anke%2Caps%2C152&sr=8-6"
                        >
                          Anker Bluetooth Speaker
                          <ExternalLinkIcon mx="2px" />
                        </Link>
                      </ListItem>
                    </UnorderedList>
                  </ListItem>
                  <ListItem>VikeLabs stickers</ListItem>
                </UnorderedList>
              </Box>
            </VStack>
          </Box>
          <VStack id="submit">
            <Box>
              <Countdown />
            </Box>
            <Button
              colorScheme="pink"
              size="lg"
              as={Link}
              href="https://docs.google.com/forms/d/e/1FAIpQLSdL4Omqd3uZABfi0JkM-1eEl96pSgrYjqxW8rTSb7hDmNfgyQ/viewform?usp=sf_link"
              _target="blank"
              rightIcon={<ArrowRightIcon />}
              disabled={days === 0 && hours === 0 && minutes === 0 && seconds === 0}
            >
              Submit
            </Button>
          </VStack>
        </VStack>
      </Container>
    </Page>
  );
}
