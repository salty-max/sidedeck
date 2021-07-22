import jwt from 'jsonwebtoken';

export const signJwt = (payload, key) =>
  jwt.sign(payload, key, { algorithm: 'RS256' });

export const decode = (token: string, secret) => {
  if (!token) return null;

  try {
    const decoded = jwt.verify(token, secret);

    return decoded;
  } catch (err) {
    console.error(`error`, err);
    return null;
  }
};
