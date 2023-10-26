import { NextApiRequest, NextApiResponse } from 'next';

const login = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    res.setHeader('Set-Cookie', 'token=true;Max-Age=3600;HttpOnly,Secure');

    res.status(200).json({ statusCode: 200, message: 'Login success' });
  } catch (error) {
    res.status(500).json({ statusCode: 500, message: 'Something went wrong' });
  }
};

export default login;
