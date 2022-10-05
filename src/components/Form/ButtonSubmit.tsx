import { Button, Flex } from '@chakra-ui/react';

interface ButtonSubmitProps {
  isLoading: boolean;
}

export const ButtonSubmit = ({ isLoading }: ButtonSubmitProps) => {
  return (
    <Flex>
      <Button colorScheme="pink" mr={3} type="submit" isLoading={isLoading}>
        Salvar
      </Button>
      <Button _hover={{ filter: 'brightness(0.8)' }} variant="ghost">
        Cancelar
      </Button>
    </Flex>
  );
};
