// model form to create a new expense

import React from "react";
import {
    Box,
    Button,
    FormControl,
    Input,
    Select,
    Text,
} from "@chakra-ui/react";

interface createExpenseProps {
    createExpense: (
        name: string,
        amount: number,
        payer: string,
        exclusions: string[]
    ) => void;
    availableUsers: string[];
}

const CreateExpense = ({
    createExpense,
    availableUsers,
}: createExpenseProps) => {
    const [name, setName] = React.useState("");
    const [amount, setAmount] = React.useState("");
    const [payer, setPayer] = React.useState("");
    const [exclusions, setExclusions] = React.useState<string[]>([]);

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
        createExpense(name, parseInt(amount), payer, exclusions);
    }

    return (
        <Box
            sx={{
                width: "100%",
                height: "100%",
                backgroundColor: "white",
                borderRadius: "5px",
                padding: "10px",
                outline: "1px solid black",
            }}
        >
            <form onSubmit={handleSubmit}>
                <FormControl isRequired marginBottom={2}>
                    <Input
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        marginBottom={5}
                    />
                    <Input
                        type="number"
                        placeholder="Amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        required
                        marginBottom={5}
                    />
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
                            outline: "1px solid black",
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

export default CreateExpense;
