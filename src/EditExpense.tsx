// model form to create a new expense

import React from "react";
import {
    Box,
    Button,
    FormControl,
    Input,
    NumberInput,
    NumberInputField,
    Select,
    Text,
} from "@chakra-ui/react";
import { Expense } from "./ExpenseCard";

interface editExpenseProps {
    editExpense: (
        name: string,
        amount: number,
        payer: string,
        exclusions: string[]
    ) => void;
    availableUsers: string[];
    expense: Expense;
}

const EditExpense = ({
    editExpense,
    availableUsers,
    expense,
}: editExpenseProps) => {
    const [name, setName] = React.useState(expense.name);
    const [amount, setAmount] = React.useState(expense.amount.toString());
    const [payer, setPayer] = React.useState(expense.payer);
    const [exclusions, setExclusions] = React.useState(expense.exclusions);

    function handleExclusionClick(exclusion: string) {
        // check if exclusion is already in exclusions
        if (exclusions.includes(exclusion)) {
            setExclusions(exclusions.filter((e) => e !== exclusion));
        } else {
            setExclusions([...exclusions, exclusion]);
        }
    }

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (name === "" || amount === "" || payer === "") {
            alert("Please fill out all fields");
            return;
        }
        console.log("Form submitted:", name, amount, payer);
        editExpense(name, Number(amount), payer, exclusions);
    }

    return (
        <Box
            sx={{
                width: "100%",
                height: "100%",
                backgroundColor: "white",
                borderRadius: "5px",
                padding: "10px",
                outline: "1px solid lightgray",
                marginBottom: 5,
            }}
        >
            <form onSubmit={handleSubmit}>
                <FormControl isRequired marginBottom={2}>
                    <Input
                        type="text"
                        placeholder="Expense Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        marginBottom={5}
                    />
                    <NumberInput
                        defaultValue={amount}
                        precision={2}
                        step={0.2}
                        marginBottom={5}
                        isRequired
                    >
                        <NumberInputField
                            value={amount}
                            placeholder="Amount"
                            onChange={(e) => setAmount(e.target.value)}
                        />
                    </NumberInput>
                    {/* dropdown for available users */}
                    <Select
                        placeholder="Payer"
                        value={payer}
                        marginBottom={5}
                        onChange={(e) => setPayer(e.target.value)}
                    >
                        {availableUsers.map((user) => (
                            <option key={user} value={user}>
                                {user}
                            </option>
                        ))}
                    </Select>
                    {/* exclusions list, dropdown to exclude users, and a text area to show exclusions */}
                    <Text variant={"heading"}>Exclusions (optional)</Text>
                    {/* buttons of users names to add and remove exclusions */}
                    {availableUsers.map((user) => (
                        <Button
                            key={user}
                            sx={{ margin: 1 }}
                            onClick={() => handleExclusionClick(user)}
                        >
                            {user}
                        </Button>
                    ))}
                    <Box
                        sx={{
                            margin: 1,
                            outline: "1px solid lightgray",
                            height: "200px",
                            borderRadius: "5px",
                        }}
                    >
                        {exclusions.map((exclusion) => (
                            <Button
                                key={exclusion}
                                sx={{ margin: 1 }}
                                onClick={() => handleExclusionClick(exclusion)}
                            >
                                {exclusion}
                            </Button>
                        ))}
                    </Box>

                    <Button type="submit">Submit</Button>
                </FormControl>
            </form>
        </Box>
    );
};

export default EditExpense;
