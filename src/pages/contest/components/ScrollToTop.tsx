import { useEffect, useState } from 'react';

import { ChevronUpIcon } from '@chakra-ui/icons';
import { Box, IconButton } from '@chakra-ui/react';

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scorlled upto given distance
  const toggleVisibility = () => {
    if (window.pageYOffset > 100) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Set the top cordinate to 0
  // make scrolling smooth
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  console.log(isVisible);

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
  }, []);

  return (
    <>
      {isVisible && (
        <Box position="absolute" bottom="1.5rem" left="1.5rem" zIndex={999} className="scroll">
          <IconButton
            colorScheme="cyan"
            isRound
            aria-label="back to top"
            size="lg"
            icon={<ChevronUpIcon />}
            onClick={scrollToTop}
          />
        </Box>
      )}
    </>
  );
}
