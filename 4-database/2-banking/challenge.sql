/*
    Challenge: Implement a Secure Fund Transfer Function

    In this challenge, you will implement a PostgreSQL stored function to simulate transferring funds 
    between two accounts in a banking system. The function must follow proper validation, ensure data 
    integrity, and log transactions with a shared reference.

    Your function should be named:
    banking.transfer_funds(from_id INT, to_id INT, amount NUMERIC)

    The function must:

    - Prevent transfers to the same account
    - Ensure the transfer amount is greater than zero
    - Validate that both sender and recipient accounts exist
    - Prevent transfers if either account is marked as "frozen"
    - Ensure the sender has sufficient funds
    - Debit the sender and credit the recipient atomically
    - Log two transactions: a withdrawal and a deposit, both linked by the same UUID reference
    - Raise meaningful exceptions for all validation failures

    The function should perform all operations within a safe transactional context, maintaining 
    database consistency even in the event of failure.

    Notes:
    - In order to test you can mock some additional data in the tables that participates in this challenge.
    - Make sure of raising errors when they're present

    ERD:
    +---------------------+            +--------------------------+
    |     accounts        |            |      transactions        |
    +---------------------+            +--------------------------+
    | account_id (PK)     |<-----------| transaction_id (PK)      |
    | balance             |            | account_id (FK)          |
    | status              |            | amount                   |
    +---------------------+            | transaction_type         |
                                       | reference                |
                                       | transaction_date         |
                                       +--------------------------+
*/


-- your solution here
CREATE OR REPLACE FUNCTION banking.transfer_funds(
    from_id INT,
    to_id INT,
    amount NUMERIC
)
RETURNS VOID
LANGUAGE plpgsql
AS $$
DECLARE
    init_balance NUMERIC;
    transfer_reference UUID := gen_random_uuid();
BEGIN

    -- Validate amount
    IF amount <= 0 THEN
        RAISE EXCEPTION 'Transfer amount must be greater than zero';
    END IF;

    -- Prevent same-account transfer
    IF from_id = to_id THEN
        RAISE EXCEPTION 'Source and destination accounts cannot be the same';
    END IF;

    -- Validate source account
    PERFORM 1
    FROM banking.accounts
    WHERE account_id = from_id;

    IF NOT FOUND THEN
        RAISE EXCEPTION 'Source account % does not exist', from_id;
    END IF;

    -- Validate destination account
    PERFORM 1
    FROM banking.accounts
    WHERE account_id = to_id;

    IF NOT FOUND THEN
        RAISE EXCEPTION 'Destination account % does not exist', to_id;
    END IF;

    -- Validate source status
    PERFORM 1
    FROM banking.accounts
    WHERE account_id = from_id
      AND status <> 'frozen';

    IF NOT FOUND THEN
        RAISE EXCEPTION 'Source account % is frozen', from_id;
    END IF;

    -- Validate destination status
    PERFORM 1
    FROM banking.accounts
    WHERE account_id = to_id
      AND status <> 'frozen';

    IF NOT FOUND THEN
        RAISE EXCEPTION 'Destination account % is frozen', to_id;
    END IF;

    -- Get sender balance and LOCK row
    SELECT balance
    INTO init_balance
    FROM banking.accounts
    WHERE account_id = from_id
    FOR UPDATE;

    -- Validate balance
    IF init_balance < amount THEN
        RAISE EXCEPTION
            'Source account % does not have sufficient funds',
            from_id;
    END IF;

    -- Debit sender
    UPDATE banking.accounts
    SET balance = balance - amount
    WHERE account_id = from_id;

    -- Credit recipient
    UPDATE banking.accounts
    SET balance = balance + amount
    WHERE account_id = to_id;

    -- Log withdrawal
    INSERT INTO banking.transactions (
        account_id,
        amount,
        transaction_type,
        reference,
        transaction_date
    )
    VALUES (
        from_id,
        amount,
        'withdrawal',
        transfer_reference,
        CURRENT_TIMESTAMP
    );

    -- Log deposit
    INSERT INTO banking.transactions (
        account_id,
        amount,
        transaction_type,
        reference,
        transaction_date
    )
    VALUES (
        to_id,
        amount,
        'deposit',
        transfer_reference,
        CURRENT_TIMESTAMP
    );

END;
$$;
