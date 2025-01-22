

const LoanRequirements = () => {
  const requirements = [
    {
      title: "Personal Information",
      details: [
        "Government-issued ID (passport, driver’s license, national ID)",
        "Proof of address (e.g., utility bills, rental agreement)",
        "Contact information (phone number and email address)",
      ],
    },
    {
      title: "Income Proof",
      details: [
        "Recent pay stubs or employment verification letter for salaried individuals",
        "Profit and loss statements for self-employed individuals",
        "Recent bank statements showing regular income or savings",
      ],
    },
    {
      title: "Creditworthiness",
      details: [
        "A good credit score (typically above 650)",
        "Credit history showing past loans and repayment behavior",
      ],
    },
    {
      title: "Loan-Specific Documents",
      details: [
        "Purpose of loan (e.g., home purchase, business expansion)",
        "Details of collateral for secured loans (e.g., property documents)",
        "Information of co-applicant or guarantor, if required",
      ],
    },
    {
      title: "Other Financial Information",
      details: [
        "Debt-to-income ratio below 40%",
        "Evidence of savings or other financial assets",
      ],
    },
  ];

  return (
    <div className="min-h-screen  p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-bold text-center mb-6">
          Loan Requirements
        </h1>
        <p className="text-gray-600 text-center mb-4">
          Here's what you need to apply for a loan.
        </p>
        <ul className="space-y-6">
          {requirements.map((section, index) => (
            <li key={index} className="border-b pb-4">
              <h2 className="text-xl font-semibold text-blue-600 mb-2">
                {section.title}
              </h2>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                {section.details.map((detail, idx) => (
                  <li key={idx}>{detail}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
        <div className="mt-6 text-center">
          <p className="text-gray-500 text-sm">
            Ensure you review the lender's terms and conditions before applying.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoanRequirements;
