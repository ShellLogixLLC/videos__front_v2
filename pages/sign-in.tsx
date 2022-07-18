import {GetServerSideProps, GetServerSidePropsResult, NextPage} from 'next';

import {getCookie} from '~/libraries';
import {Seo, SignIn} from '~/components';
import {pageRedirect} from '~/utils';

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
  const token = getCookie('token', ctx.req.headers.cookie as string);

  pageRedirect(token, ctx);

  return {
    props: {},
  };
};

export default SignInPage;
