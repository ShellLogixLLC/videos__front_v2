import {RouterService} from '~/services';
import {IS_SERVER, Route} from '~/constants';

const ctxRedirect = (ctx: any, path: string) => {
  ctx.res.writeHead(301, {
    Location: path,
  });
  ctx.res.end();
};

const pageRedirect = (token: boolean, ctx: any) => {
  if (token) {
    if (IS_SERVER) {
      ctxRedirect(ctx, Route.Error);
    } else {
      RouterService.push(Route.Error);
    }
  }
  return;
};

export default pageRedirect;
