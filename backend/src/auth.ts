import * as jwt from 'jsonwebtoken';

/**
 * Create a token from the given data
 * @param data The data to encode in the token.
 * @param expiresIn The duration of the token.
 * @returns The token.
 */
export function createToken(
  data: object,
  expiresIn: number | undefined = undefined,
): string {
  const secret = process.env.JWT_SECRET || '';
  return jwt.sign(data, secret, {expiresIn});
}

/**
 * Verify the given token.
 * @param token The token to verify.
 * @returns The data in the token.
 */
export function verifyToken(token: string): object | string {
  const secret = process.env.JWT_SECRET || '';
  return jwt.verify(token, secret);
}
