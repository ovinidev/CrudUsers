import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
} from '@chakra-ui/react';
import { useMutation, useQuery } from '@tanstack/react-query';

import { SubmitHandler, useForm } from 'react-hook-form';
import { updateUser } from '../../api/axiosInstance';
import { useToastCall } from '../../hooks/useToastCall';
import { UsersData } from '../../interfaces/User';
import { queryClient } from '../../pages/_app';
import { ButtonSubmit } from '../Form/ButtonSubmit';
import { Input } from '../Form/Input';

interface CreateUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  userData: UsersData;
  handleDetails: (id: string) => Promise<void>;
}

interface UserProps {
  name: string;
  age: string;
  email: string;
  role: string;
}

export const UpdateUserModal = ({
  isOpen,
  onClose,
  userData,
  handleDetails,
}: CreateUserModalProps) => {
  const { error, isLoading, isSuccess, mutateAsync } = useMutation(
    async (date: UserProps) => {
      await updateUser(userData._id, date);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['users']);
        handleDetails(userData._id);
        handleSuccessToast(
          'Usuário editado!',
          'O usuário foi editado com sucesso',
        );
        reset();
        onClose();
      },
    },
  );

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<UserProps>();

  const { handleSuccessToast, handleErrorToast } = useToastCall();

  const onSubmit: SubmitHandler<UserProps> = async (data) => {
    try {
      await mutateAsync(data);
    } catch (error: any) {
      handleErrorToast('Erro ao editar', error.message);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent
        bg="gray.800"
        p="2"
        as="form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <ModalHeader>Editar usuário</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack spacing="4">
            <Input
              {...register('name', { required: true })}
              name="name"
              label="Nome"
              type="text"
            />
            <Input
              {...register('age', { required: true })}
              name="age"
              label="Idade"
              type="number"
            />
            <Input
              {...register('email', { required: true })}
              name="email"
              label="Email"
              type="email"
            />
            <Input
              {...register('role', { required: true })}
              name="role"
              label="Função"
              type="text"
            />
          </Stack>
        </ModalBody>

        <ModalFooter display="flex" justifyContent="center">
          <ButtonSubmit isLoading={isLoading} />
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
