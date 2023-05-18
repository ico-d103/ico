export const middleware = (req: any, res: any, next: any) => {
    const host = req.get("host");
    const protocol = req.headers["x-forwarded-proto"] || req.protocol;
    if (host === "k8d103.p.ssafy.io" || protocol !== "https") {
      res.redirect(301, `https://k8d103.p.ssafy.io${req.url}`);
    } else {
      next();
    }
  };