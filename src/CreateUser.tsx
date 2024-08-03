// model form to create a new user

import React from "react";
import { Box, Button, FormControl, Input } from "@chakra-ui/react";

interface createUserProps {
    createUser: (name: string) => void;
}

const CreateUser = ({ createUser }: createUserProps) => {
    const [name, setName] = React.useState("");

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        console.log("Form submitted:", name);
        createUser(name);
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
                    <Button type="submit">Submit</Button>
                </FormControl>
            </form>
        </Box>
    );
};

export default CreateUser;
