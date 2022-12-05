export const getProgress = () => {
  return [
    ...(process.env.NEXT_PUBLIC_SECQES_PAGE === `ON`
      ? [`Security Questions`]
      : []),
    `Card Information`,
    `Personal Information`,
    `Email Verification`,
    ...(process.env.NEXT_PUBLIC_DOCS_PAGE === `ON`
      ? [`Supporting Documents`]
      : []),
    `Confirmation`,
  ];
};
