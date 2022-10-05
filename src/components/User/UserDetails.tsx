import { Box, Button, Flex, Heading, HStack, Text } from '@chakra-ui/react';
import { UsersData } from '../../interfaces/User';

interface UserDetailsProps {
  userDetails: UsersData;
  handleDeleteUser: (id: string) => Promise<void>;
  setIsOpen2: (value: boolean) => void;
}

export const UserDetails = ({
  userDetails,
  handleDeleteUser,
  setIsOpen2,
}: UserDetailsProps) => {
  return (
    <Flex
      align="flex-start"
      justify="center"
      direction="column"
      mt={{ base: '2rem', xl: '0' }}
      w={{ base: '100%', xl: '50%' }}
      ml={{ base: 'none', xl: '2rem' }}
      p="1rem"
      mb={{ base: '4rem', xl: 'none' }}
      bg="gray.900"
      fontSize="1.2rem"
    >
      {Object.keys(userDetails).length > 0 ? (
        <Box pl={{ base: 'none', xl: '2rem' }}>
          <Text>
            <strong>Nome:</strong> {userDetails.name}
          </Text>
          <Text>
            <strong>Idade: </strong>
            {userDetails.age}
          </Text>
          <Text>
            <strong>Função: </strong>
            {userDetails.role}
          </Text>
          <Text>
            <strong>Email:</strong> {userDetails.email}
          </Text>

          <HStack
            spacing="4"
            alignSelf={{ base: 'center', xl: 'flex-start' }}
            mt="1rem"
          >
            {' '}
            <Button
              colorScheme={'red'}
              onClick={() => handleDeleteUser(userDetails._id)}
            >
              Apagar
            </Button>
            <Button
              colorScheme={'blue'}
              onClick={async () => {
                setIsOpen2(true);
              }}
            >
              Editar
            </Button>
          </HStack>
        </Box>
      ) : (
        <Heading alignSelf={'center'}>Clique para ver detalhes</Heading>
      )}
    </Flex>
  );
};
