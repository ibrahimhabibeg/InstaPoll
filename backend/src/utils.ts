import {POLL_CODE_LENGTH} from './config';
import {isCodeUsed} from './persistence';

/**
 * Generate a random poll code that is not already in use.
 * @returns A unique poll code.
 */
export const generatePollCode = async (): Promise<string> => {
  let code: string;
  let containPollCode: boolean;
  do {
    code = Math.random()
      .toString()
      .slice(2, 2 + POLL_CODE_LENGTH);
    containPollCode = await isCodeUsed(code);
  } while (containPollCode);
  return code;
};
