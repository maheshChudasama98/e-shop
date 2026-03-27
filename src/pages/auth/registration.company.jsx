import { Helmet } from 'react-helmet-async';

import RegistrationCompany from 'src/Apps/Auth/registrationCompany/RegistrationCompany';

// ----------------------------------------------------------------------

export default function LoginPage() {
  return (
    <>
      <Helmet>
        <title> Registration </title>
      </Helmet>

      <RegistrationCompany />
    </>
  );
}
