
export const validateLogin = (email: string, password: string): boolean => {
  try {
    const accounts = JSON.parse(localStorage.getItem('accounts') || '[]');
    const account = accounts.find((acc: any) => acc.email === email && acc.password === password);
    return !!account;
  } catch (error) {
    console.error('Error validating login:', error);
    return false;
  }
};

export const createAccount = (email: string, password: string): boolean => {
  try {
    const accounts = JSON.parse(localStorage.getItem('accounts') || '[]');
    
    // Check if account already exists
    const existingAccount = accounts.find((acc: any) => acc.email === email);
    if (existingAccount) {
      return false;
    }

    // Create new account with hardcoded values as per Python version
    const newAccount = {
      account_id: '4',
      MembershipNumber: '675',
      DateCreated: '2020-12-20',
      email: email,
      password: password
    };

    accounts.push(newAccount);
    localStorage.setItem('accounts', JSON.stringify(accounts));
    
    // Log transaction
    const transactions = JSON.parse(localStorage.getItem('transactions') || '[]');
    transactions.push({
      type: 'INSERT',
      table: 'Account',
      query: `INSERT INTO Account (account_id, MembershipNumber, DateCreated, email, password) VALUES ('4', '675', '2020-12-20', '${email}', '${password}')`,
      timestamp: new Date().toISOString()
    });
    localStorage.setItem('transactions', JSON.stringify(transactions));
    
    return true;
  } catch (error) {
    console.error('Error creating account:', error);
    return false;
  }
};
