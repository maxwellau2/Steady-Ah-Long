import { Box, Text, Stack, Flex, Avatar } from "@chakra-ui/react";

interface User {
    name: string;
    amountPaid: number;
}

const UserCard = ({ user }: { user: User }) => {
    return (
        <Box
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            boxShadow="lg"
            p={4}
            bg="white"
            width="100%"
            maxW="sm"
        >
            <Flex align="center" mb={4}>
                <Avatar name={user.name} size="md" mr={4} />
                <Text fontSize="xl" fontWeight="bold" color="teal.500">
                    {user.name}
                </Text>
            </Flex>
            <Stack spacing={2}>
                <Text fontSize="md">
                    <strong>Amount Paid:</strong> ${user.amountPaid.toFixed(2)}
                </Text>
            </Stack>
        </Box>
    );
};

export default UserCard;
