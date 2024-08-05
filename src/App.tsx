import React from "react";
import { Box, Button, Center, HStack, Text, VStack } from "@chakra-ui/react";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
} from "@chakra-ui/react";
import UserCard from "./UserCard";
import CreateUser from "./CreateUser";
import CreateExpense from "./CreateExpense";
import ExpenseCard from "./ExpenseCard";
import { splitBills, Settlement } from "./BillSplittor";
import DebtSettleModal from "./DebtSettleModal";

interface User {
    name: string;
    amountPaid: number;
}

interface Expense {
    name: string;
    amount: number;
    payer: string;
    exclusions: string[];
}

const App = () => {
    const [users, setUsers] = React.useState<User[]>([
        // { name: "John Doe", amountPaid: 0 },
        // { name: "Jane Smith", amountPaid: 0 },
    ]);
    const [expenses, setExpenses] = React.useState<Expense[]>([]);
    const [settlements, setSettlements] = React.useState<Settlement>({});

    // modal openers
    const [openCreateUser, setOpenCreateUser] = React.useState(false);
    const [openAddExpense, setOpenAddExpense] = React.useState(false);
    const [openSettleDebt, setOpenSettleDebt] = React.useState(false);

    function addUser(name: string) {
        // check if name already exists
        if (users.some((user) => user.name === name)) {
            alert("User already exists");
            return;
        } else {
            const newUser = {
                name: name,
                amountPaid: 0,
                amountOwed: 0,
            };
            setUsers([...users, newUser]);
            setOpenCreateUser(false);
        }
    }
    function addExpense(
        name: string,
        amount: number,
        payer: string,
        exclusions: string[]
    ) {
        // check if expense already exists
        if (expenses.some((expense) => expense.name === name)) {
            alert("Expense already exists, consider renaming this expense");
            return;
        } else {
            const newExpense = {
                name: name,
                amount: amount,
                payer: payer,
                exclusions: exclusions,
            };
            // add expense to user that paid it
            const user = users.find((user) => user.name === payer);
            if (user) {
                let userCopy = user;
                userCopy.amountPaid += amount;
                setUsers([...users]);
            }
            setExpenses([...expenses, newExpense]);
            setOpenAddExpense(false);
        }
    }
    return (
        <Box height={"100vh"} width={"100vw"} margin={0} padding={0}>
            {/* create nav bar with new user button, and settle debt button */}
            <VStack p={10} marginBottom={5}>
                <Text variant={"heading"} fontWeight={"bold"}>
                    Steady Ah Long Bill Splittor
                </Text>
                <Text variant={"subheading"}>
                    Add a user to get started, then add an expense
                </Text>
                <Center p={5}>
                    <HStack>
                        <Button
                            colorScheme="teal"
                            onClick={() => setOpenCreateUser(true)}
                        >
                            New User
                        </Button>
                        <Button
                            colorScheme="yellow"
                            onClick={() => setOpenAddExpense(true)}
                        >
                            Add Expense
                        </Button>
                        <Button
                            colorScheme="teal"
                            onClick={() => {
                                const settle = splitBills(
                                    expenses,
                                    users.map((user) => user.name)
                                );
                                console.log(settle);
                                setSettlements(settle);
                                setOpenSettleDebt(true);
                            }}
                        >
                            Settle Debt
                        </Button>
                    </HStack>
                </Center>
                {/* create a table with all users using UserCard component  in a 3 column grid */}
                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: "repeat(2, 1fr)",
                        gap: "10px",
                        marginX: 5,
                    }}
                >
                    {users.map((user) => (
                        <UserCard key={user.name} user={user} />
                    ))}
                </Box>
                {/* display expenses in a grid */}
                <Box sx={{ marginX: 5, marginY: 5, width: "100%" }}>
                    <Text variant={"heading"} fontWeight={"bold"}>
                        Expenses
                    </Text>
                    <Box
                        sx={{
                            display: "grid",
                            gap: "10px",
                            width: "100%",
                        }}
                    >
                        {expenses.map((expense) => (
                            <ExpenseCard
                                key={expense.name}
                                expense={expense}
                                expenses={expenses}
                                setExpenses={setExpenses}
                                availableUsers={users.map((user) => user.name)}
                            />
                        ))}
                    </Box>
                </Box>
            </VStack>
            {/* modals */}
            <Modal
                isOpen={openCreateUser}
                onClose={() => setOpenCreateUser(false)}
                isCentered
                size={"xs"}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Create User</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <CreateUser createUser={(name) => addUser(name)} />
                    </ModalBody>
                </ModalContent>
            </Modal>
            <Modal
                isOpen={openAddExpense}
                onClose={() => setOpenAddExpense(false)}
                size={"xs"}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Add Expense</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <CreateExpense
                            createExpense={(name, amount, payer, exclusions) =>
                                addExpense(name, amount, payer, exclusions)
                            }
                            availableUsers={users.map((user) => user.name)}
                        />
                    </ModalBody>
                </ModalContent>
            </Modal>
            <Modal
                isOpen={openSettleDebt}
                onClose={() => setOpenSettleDebt(false)}
                size={"sm"}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Settle Debt</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <DebtSettleModal
                            settlements={settlements}
                            isOpen={openSettleDebt}
                            onClose={() => setOpenSettleDebt(false)}
                        />
                    </ModalBody>
                </ModalContent>
            </Modal>
        </Box>
    );
};

export default App;
