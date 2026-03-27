import { Helmet } from 'react-helmet-async';
import Page from 'src/Apps/Admin/Dashboard/Profit';

// ----------------------------------------------------------------------

export default function ProfitPage() {
  return (
    <>
      <Helmet>
        <title>Profit | ZAFE</title>
      </Helmet>
      <Page />
    </>
  );
} 