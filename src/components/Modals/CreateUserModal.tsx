import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
} from '@chakra-ui/react';
import { useMutation } from '@tanstack/react-query';

import { SubmitHandler, useForm } from 'react-hook-form';
import { createUser } from '../../api/axiosInstance';
import { useToastCall } from '../../hooks/useToastCall';
import { UserProps } from '../../interfaces/User';
import { queryClient } from '../../pages/_app';
import { ButtonSubmit } from '../Form/ButtonSubmit';
import { Input } from '../Form/Input';

interface CreateUserModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateUserModal = ({ isOpen, onClose }: CreateUserModalProps) => {
  const { isLoading, mutateAsync } = useMutation(
    async (date: UserProps) => {
      await createUser(date);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['users']);
        handleSuccessToast(
          'Usuário criado!',
          'O usuário foi criado com sucesso',
        );
        onClose();
        reset();
      },
    },
  );

  const { register, handleSubmit, reset } = useForm<UserProps>();

  const { handleSuccessToast, handleErrorToast } = useToastCall();

  const onSubmit: SubmitHandler<UserProps> = async (data) => {
    try {
      await mutateAsync(data);
    } catch (error: any) {
      handleErrorToast('Erro ao criar', error.message);
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
        <ModalHeader>Criar usuário</ModalHeader>
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
