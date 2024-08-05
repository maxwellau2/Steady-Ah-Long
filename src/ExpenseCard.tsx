// import { Box, Grid, HStack, Text } from "@chakra-ui/react";
// import React from "react";

// interface Expense {
//     name: string;
//     amount: number;
//     payer: string;
//     exclusions: string[];
// }

// const ExpenseCard = ({ expense }: { expense: Expense }) => {
//     return (
//         // card with expense name, amount, and payer
//         <Box
//             sx={{
//                 width: "100%",
//                 height: "100%",
//                 backgroundColor: "white",
//                 borderRadius: "5px",
//                 padding: "10px",
//                 outline: "1px solid black",
//             }}
//         >
//             <Grid templateColumns="repeat(3, 1fr)" gap={5}>
//                 <Text variant={"subheading"} fontWeight={"bold"}>
//                     {expense.name}
//                 </Text>
//                 <Text variant={"subheading"}>
//                     Amount: <strong>{expense.amount}</strong>
//                 </Text>
//                 <Text variant={"subheading"}>
//                     Payer: <strong>{expense.payer}</strong>
//                 </Text>
//                 <Text variant={"subheading"}>
//                     Exclusions:{" "}
//                     {expense.exclusions.map((exclusion) => (
//                         <Text key={exclusion}>{exclusion}</Text>
//                     ))}
//                 </Text>
//             </Grid>
//         </Box>
//     );
// };

// export default ExpenseCard;

import {
    Box,
    Grid,
    Text,
    Tag,
    TagLabel,
    Wrap,
    Flex,
    Button,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    HStack,
} from "@chakra-ui/react";
import React from "react";
import EditExpense from "./EditExpense";

export interface Expense {
    name: string;
    amount: number;
    payer: string;
    exclusions: string[];
}

interface ExpenseCardProps {
    expense: Expense;
    expenses: Expense[];
    availableUsers: string[];
    setExpenses: React.Dispatch<React.SetStateAction<Expense[]>>;
}

const ExpenseCard = ({
    expense,
    expenses,
    setExpenses,
    availableUsers,
}: ExpenseCardProps) => {
    const [openDeleteExpense, setOpenDeleteExpense] = React.useState(false);
    const [openEditExpense, setOpenEditExpense] = React.useState(false);

    function deleteExpense(name: string) {
        // remove the expense from the expenses array
        const newExpenses = expenses.filter((expense) => expense.name !== name);
        setExpenses(newExpenses);
    }

    function editExpense(
        name: string,
        amount: number,
        payer: string,
        exclusions: string[]
    ) {
        // find the index of the expense to edit
        const index = expenses.findIndex((expense) => expense.name === name);
        // create a copy of the expense to edit
        let expenseCopy = expense;
        expenseCopy.name = name;
        expenseCopy.amount = amount;
        expenseCopy.payer = payer;
        expenseCopy.exclusions = exclusions;
        // update the expenses array with the edited expense
        let newExpenses = [...expenses];
        newExpenses[index] = expenseCopy;
        setExpenses(newExpenses);
        setOpenEditExpense(false);
    }
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
            <Grid templateColumns="1fr auto" gap={2} alignItems="center">
                <Text fontSize="xl" fontWeight="bold" color="teal.500">
                    {expense.name}
                </Text>
                <Text fontSize="md" textAlign="right">
                    ${expense.amount.toFixed(2)}
                </Text>

                <Text fontSize="md">
                    <strong>Payer:</strong>
                </Text>
                <Text fontSize="md" textAlign="right">
                    {expense.payer}
                </Text>

                <Text fontSize="md">
                    <strong>Exclusions:</strong>
                </Text>
                <Flex justify="flex-end">
                    {expense.exclusions.length > 0 ? (
                        <Wrap spacing={2} justify="flex-end">
                            {expense.exclusions.map((exclusion) => (
                                <Tag
                                    size="sm"
                                    key={exclusion}
                                    colorScheme="red"
                                >
                                    <TagLabel>{exclusion}</TagLabel>
                                </Tag>
                            ))}
                        </Wrap>
                    ) : (
                        <Text fontSize="sm">None</Text>
                    )}
                </Flex>
            </Grid>
            <HStack marginTop={6} gap={2}>
                <Button
                    colorScheme="red"
                    onClick={() => setOpenDeleteExpense(true)}
                >
                    Delete
                </Button>
                <Button
                    colorScheme="yellow"
                    onClick={() => {
                        const idx = expenses.findIndex(
                            (e) => e.name === expense.name
                        );
                        setOpenEditExpense(true);
                        console.log("edit", idx);
                    }}
                >
                    Edit
                </Button>
            </HStack>
            {/* modal to delete an expense */}
            <Modal
                isOpen={openDeleteExpense}
                onClose={() => setOpenDeleteExpense(false)}
                size={"xs"}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Delete Expense</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        Are you sure you want to delete this expense?
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            colorScheme="red"
                            onClick={() => {
                                setOpenDeleteExpense(false);
                                deleteExpense(expense.name);
                            }}
                        >
                            Yes
                        </Button>
                        <Button onClick={() => setOpenDeleteExpense(false)}>
                            No
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            <Modal
                isOpen={openEditExpense}
                onClose={() => setOpenEditExpense(false)}
                size={"xs"}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Edit Expense</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <EditExpense
                            editExpense={(name, amount, payer, exclusions) =>
                                editExpense(name, amount, payer, exclusions)
                            }
                            availableUsers={availableUsers}
                            expense={expense}
                        />
                    </ModalBody>
                </ModalContent>
            </Modal>
        </Box>
    );
};

export default ExpenseCard;
