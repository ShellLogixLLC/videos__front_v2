const ctxRedirect = (ctx: any, path: string) => {
  ctx.res.writeHead(301, {
    Location: path,
  });
  ctx.res.end();
};

export default ctxRedirect;
