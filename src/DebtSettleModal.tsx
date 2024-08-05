import { Settlement } from "./BillSplittor";
import {
    Box,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    Text,
    Stack,
    Divider,
} from "@chakra-ui/react";

interface DebtSettleModalProps {
    settlements: Settlement;
    isOpen: boolean;
    onClose: () => void;
}

const DebtSettleModal = ({
    settlements,
    isOpen,
    onClose,
}: DebtSettleModalProps) => {
    console.log(settlements);
    return (
        <Modal isOpen={isOpen} onClose={onClose} size="sm">
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Debt Settlement Details</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    {Object.keys(settlements).map((key) => (
                        <Box key={key} mb={4}>
                            <Text fontSize="lg" fontWeight="bold" mb={2}>
                                {key} to receive:
                            </Text>
                            <Stack spacing={2} pl={4}>
                                {Object.keys(settlements[key]).map(
                                    (recipient) => (
                                        <Box
                                            key={recipient}
                                            p={3}
                                            backgroundColor="gray.100"
                                            borderRadius="md"
                                        >
                                            <Text fontSize="md">
                                                <strong>
                                                    $
                                                    {settlements[key][
                                                        recipient
                                                    ].toFixed(2)}
                                                </strong>{" "}
                                                from {recipient}
                                            </Text>
                                        </Box>
                                    )
                                )}
                            </Stack>
                            <Divider mt={4} />
                        </Box>
                    ))}
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default DebtSettleModal;
