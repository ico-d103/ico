import { IncomingMessage, ServerResponse } from 'http';
import { NextApiRequest, NextApiResponse } from 'next';

export default function(req: IncomingMessage & NextApiRequest, res: ServerResponse & NextApiResponse) {
  if (req.headers['x-forwarded-proto'] !== 'https') {
    res.redirect(`https://${req.headers.host}${req.url}`);
  } else {
    return res.status(200).send('OK');
  }
}