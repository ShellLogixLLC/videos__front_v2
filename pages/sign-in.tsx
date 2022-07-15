import {GetServerSideProps, GetServerSidePropsResult, NextPage} from 'next';

import {getCookie} from '~/libraries';
import {Seo, SignIn} from '~/components';
import {ctxRedirect} from '~/utils';
import {RouterService} from '~/services';
import {IS_SERVER, Route} from '~/constants';

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

  if (token) {
    if (IS_SERVER) {
      ctxRedirect(ctx, Route.Error);
    } else {
      RouterService.push(Route.Error);
    }
  }
  return {
    props: {},
  };
};

export default SignInPage;
