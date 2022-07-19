import {GetServerSideProps, GetServerSidePropsResult, NextPage} from 'next';

import {getCookie} from '~/libraries';
import {Seo, SignIn} from '~/components';
import {EmptyProps, getProtectedPageRedirect, LocaleKeys} from '~/constants';

const SignInPage: NextPage = () => (
  <Seo
    title="Sign-in page"
    showHeaderFooter={false}
    metaDescription="Sign-in page description">
    <SignIn />
  </Seo>
);

export const getServerSideProps: GetServerSideProps = async (
  ctx,
): Promise<GetServerSidePropsResult<{}>> => {
  const {locale, req} = ctx;
  const token = getCookie('token', req.headers.cookie as string);

  return token ? getProtectedPageRedirect(locale as LocaleKeys) : EmptyProps;
};

export default SignInPage;
