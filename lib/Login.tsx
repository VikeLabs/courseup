import { Box, Modal, ModalContent, ModalOverlay, useDisclosure } from "@chakra-ui/react";
import { Auth } from "@supabase/supabase-auth-helpers/react";
import { SupabaseClient } from "@supabase/supabase-js";
import { useEffect } from "react";

type Props = {
  client: SupabaseClient
}

export function LoginModal({ client }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    onOpen();
  }, [onOpen]);

  return (
    <Box>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        {/* TODO: add a 2-column layout to explain what making an account provides */}
        <ModalContent zIndex="modal" p="5">
          <Auth
            // view="update_password"
            supabaseClient={client}
            providers={['github']}
            socialLayout="horizontal"
            socialButtonSize="xlarge"
          />
        </ModalContent>
      </Modal>

    </Box>

  )
}