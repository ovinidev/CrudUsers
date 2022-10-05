import { Stack, StackProps } from '@chakra-ui/react';
import { ReactNode } from 'react';

interface UserListProps extends StackProps {
  children: ReactNode;
}

export const UserList = ({ children, ...rest }: UserListProps) => {
  return (
    <Stack
      {...rest}
      spacing="4"
      overflowY="scroll"
      h={{ base: 'none', xl: '35rem' }}
      pr={{ base: 'none', xl: '1rem' }}
      css={{
        '&::-webkit-scrollbar': {
          width: '4px',
        },
        '&::-webkit-scrollbar-track': {
          width: '6px',
        },
        '&::-webkit-scrollbar-thumb': {
          background: 'pink',
          borderRadius: '24px',
        },
      }}
    >
      {children}
    </Stack>
  );
};
