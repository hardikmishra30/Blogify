import crypto from 'crypto';

export const hashPassword = (password) => {
  return crypto.createHash('sha256').update(password).digest('hex');
};

export const verifyPassword = (password, hash) => {
  const passwordHash = hashPassword(password);
  return passwordHash === hash;
};
