interface Expense {
    name: string;
    amount: number;
    payer: string;
    exclusions: string[];
}

export interface Settlement {
    [key: string]: { [key: string]: number };
}

export function splitBills(expenses: Expense[], users: string[]): Settlement {
    const totalPaid: { [key: string]: number } = {};
    const totalOwed: { [key: string]: number } = {};
    const participants = new Set<string>(users);

    // Calculate the total amount paid and owed
    expenses.forEach((expense) => {
        const { payer, amount, exclusions } = expense;
        if (!totalPaid[payer]) totalPaid[payer] = 0;
        totalPaid[payer] += amount;

        // Determine who shares this expense
        const sharers = Array.from(participants).filter(
            (participant) =>
                !exclusions.includes(participant) && participant !== payer
        );
        if (sharers.length > 0) {
            const share = amount / (sharers.length + 1); // +1 because payer should also contribute
            sharers.forEach((sharer) => {
                if (!totalOwed[sharer]) totalOwed[sharer] = 0;
                totalOwed[sharer] += share;
            });
            if (!totalOwed[payer]) totalOwed[payer] = 0;
            totalOwed[payer] += share; // payer's own share
        }
    });

    // Calculate the fair share for each participant
    const totalExpenses = expenses.reduce(
        (sum, expense) => sum + expense.amount,
        0
    );
    const perPersonShare = totalExpenses / users.length;

    // Calculate net amounts
    const netAmounts: { [key: string]: number } = {};
    users.forEach((participant) => {
        const paid = totalPaid[participant] || 0;
        const owed = totalOwed[participant] || 0;
        netAmounts[participant] = paid - owed;
    });

    // Prepare settlements
    const settlements: Settlement = {};
    users.forEach((user) => {
        if (!settlements[user]) settlements[user] = {};
    });

    // Calculate settlements based on net amounts
    users.forEach((payer) => {
        if (netAmounts[payer] < 0) {
            let amountOwed = -netAmounts[payer];
            users.forEach((debtor) => {
                if (netAmounts[debtor] > 0) {
                    const amountToPay = Math.min(
                        amountOwed,
                        netAmounts[debtor]
                    );
                    if (amountToPay > 0) {
                        if (!settlements[debtor]) settlements[debtor] = {};
                        if (!settlements[debtor][payer])
                            settlements[debtor][payer] = 0;
                        settlements[debtor][payer] += amountToPay;
                        amountOwed -= amountToPay;
                        netAmounts[debtor] -= amountToPay;
                    }
                }
            });
        }
    });

    return settlements;
}

// Example usage
const expenses: Expense[] = [
    { name: "Dinner", amount: 100, payer: "Alice", exclusions: ["Charlie"] },
    { name: "Drinks", amount: 10, payer: "John", exclusions: ["Jane"] },
    { name: "Taxi", amount: 30, payer: "Charlie", exclusions: [] },
];

const users: string[] = ["Alice", "Bob", "Charlie", "David", "John", "Jane"];

const settlements = splitBills(expenses, users);
console.log(settlements);
