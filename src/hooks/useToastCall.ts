import { useToast } from '@chakra-ui/react';

interface useToastCall {
  handleSuccessToast: (title: string, description: string) => void;
  handleErrorToast: (title: string, description: string) => void;
}

export const useToastCall = (): useToastCall => {
  const toast = useToast();

  const handleSuccessToast = (title: string, description: string) => {
    toast({
      title: title,
      description: description,
      status: 'success',
      duration: 5000,
      position: 'bottom-right',
      isClosable: true,
    });
  };

  const handleErrorToast = (title: string, description: string) => {
    toast({
      title: title,
      description: description,
      status: 'error',
      duration: 5000,
      position: 'bottom-right',
      isClosable: true,
    });
  };

  return { handleSuccessToast, handleErrorToast };
};
