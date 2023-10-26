// import { cookies } from 'next/headers';

export const withAuthMiddleware = (api: any) => (req: any) => {
  const authHeader = req.getHeaders()['authorization'];
  const theme = req.cookies['theme'];

  console.log({ authHeader, theme });
  // const cookie = cookies();
  // console.log({ cookie });

  console.log(req, api);
  // console.log(req.headers.cookie);

  // const { token } = req.cookies;

  // if (token !== 'true') {
  //   return res.status(401).redirect('/login');
  // }

  return api(req);
};
