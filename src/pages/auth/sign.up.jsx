import { Helmet } from 'react-helmet-async';

import Component from 'src/Apps/Auth/signUp/sign-up';

// ----------------------------------------------------------------------

export default function SignUp() {
  return (
    <>
      <Helmet>
        <title> Sign up </title>
      </Helmet>
      <Component />
    </>
  );
}
