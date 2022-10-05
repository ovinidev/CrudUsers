import { Avatar, Flex, Text } from '@chakra-ui/react';
import { UsersData } from '../../interfaces/User';

interface UserItemProps {
  handleDetails: (id: string) => Promise<void>;
  user: UsersData;
}

export const UserItem = ({ handleDetails, user }: UserItemProps) => {
  return (
    <Flex
      align="center"
      bg="gray.900"
      borderRadius="5px"
      px="4"
      py="2"
      cursor="pointer"
      _hover={{ filter: 'brightness(0.9)' }}
      onClick={() => handleDetails(user._id)}
    >
      <Avatar name={user.name} />
      <Text fontSize="1.2rem" key={user._id} ml="1rem">
        {user.name}
      </Text>
    </Flex>
  );
};
