import React from 'react';
import LoanApplicationForm from './BranchLoanForm';

const OnlineLoanForm = () => {
  return (
    <LoanApplicationForm isCustomerEditable={false} />
  );
};

export default OnlineLoanForm;