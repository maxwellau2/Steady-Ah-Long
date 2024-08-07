// model form to create a new user

import React from "react";
import { Box, Button, Checkbox, FormControl, Input } from "@chakra-ui/react";

interface createUserProps {
    createUser: (name: string, exclude: boolean) => void;
}

const CreateUser = ({ createUser }: createUserProps) => {
    const [name, setName] = React.useState("");
    const [exclude, setExclude] = React.useState(true);

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        // console.log("Form submitted:", name, exclude);
        createUser(name, exclude);
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
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        marginBottom={5}
                    />
                    {/* checkbox to exclude user from expense calculations */}
                    <Checkbox
                        colorScheme="teal"
                        isChecked={exclude}
                        onChange={() => setExclude(!exclude)}
                        marginBottom={5}
                        isRequired={false}
                    >
                        Exclude from existing expenses
                    </Checkbox>
                    <Button type="submit">Submit</Button>
                </FormControl>
            </form>
        </Box>
    );
};

export default CreateUser;
