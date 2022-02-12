import {NextPage} from 'next';

import {Seo, SignIn} from '~/components';

const SignInPage: NextPage = () => (
  <Seo
    title="Sign-in page"
    showHeaderFooter={false}
    metaDescription="Sign-in page description">
    <SignIn />
  </Seo>
);

export default SignInPage;
