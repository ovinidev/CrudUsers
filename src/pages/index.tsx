import { Button, Flex, Heading, HStack } from '@chakra-ui/react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { deleteUser, getUserById, getUsers } from '../api/axiosInstance';
import { CreateUserModal } from '../components/Modals/CreateUserModal';
import { UpdateUserModal } from '../components/Modals/UpdateUserModal';
import { UserDetails } from '../components/User/UserDetails';
import { UserItem } from '../components/User/UserItem';
import { UserList } from '../components/User/UserList';
import { useToastCall } from '../hooks/useToastCall';
import { UsersData } from '../interfaces/User';
import { queryClient } from './_app';

export default function Home() {
  const [userDetails, setUserDetails] = useState<UsersData>({} as UsersData);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const { handleErrorToast, handleSuccessToast } = useToastCall();

  const { data } = useQuery(
    ['users'],
    async () => {
      const data = await getUsers();

      return data;
    },
    {
      staleTime: 1000 * 60 * 5,
      refetchOnWindowFocus: false,
    },
  );

  const handleDetails = async (id: string) => {
    try {
      const data = await getUserById(id);
      setUserDetails(data);
    } catch (err: any) {
      throw new Error(err.message);
    }
  };

  const { mutateAsync } = useMutation(
    async (id: string) => {
      await deleteUser(id);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['users']);
        handleSuccessToast(
          'Usuário deletado',
          'O usuário foi deletado com sucesso',
        );
        setUserDetails({} as UsersData);
      },
    },
  );

  const handleDeleteUser = async (id: string) => {
    try {
      await mutateAsync(userDetails._id);
    } catch (err: any) {
      handleErrorToast(
        'Erro ao deletar',
        'Houve um erro ao deletar um usuário',
      );
    }
  };

  return (
    <Flex h="100vh" align="flex-start" justify="center">
      <Flex
        direction="column"
        maxW={{ base: '90%', xl: '100%' }}
        w={850}
        px={{ base: '4', xl: 'none' }}
      >
        <HStack spacing="6" mt="6rem" alignSelf="center">
          <Heading fontSize="2rem">Usuários</Heading>
          <Button
            size="md"
            onClick={() => {
              setIsOpen(true);
            }}
            colorScheme={'pink'}
          >
            Novo usuário
          </Button>
        </HStack>
        <Flex
          direction={{ base: 'column', xl: 'row' }}
          justifyContent="space-between"
          mt="4rem"
        >
          <UserList>
            {data?.map((user) => {
              return (
                <UserItem
                  key={user._id}
                  handleDetails={handleDetails}
                  user={user}
                />
              );
            })}
          </UserList>

          <UserDetails
            handleDeleteUser={handleDeleteUser}
            setIsOpen2={setIsOpen2}
            userDetails={userDetails}
          />
        </Flex>
      </Flex>

      <CreateUserModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
      <UpdateUserModal
        handleDetails={handleDetails}
        isOpen={isOpen2}
        onClose={() => setIsOpen2(false)}
        userData={userDetails}
      />
    </Flex>
  );
}
