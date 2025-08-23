import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class BcryptService {
  /**
   * Hash a password with the specified salt rounds
   * @param password - The password to hash
   * @param saltRounds - Number of salt rounds (default: 10)
   * @returns Promise<string> - The hashed password
   */
  async hashPassword(password: string, saltRounds: number = 10): Promise<string> {
    return bcrypt.hash(password, saltRounds);
  }

  /**
   * Compare a password with a hash
   * @param password - The plain text password
   * @param hash - The hashed password to compare against
   * @returns Promise<boolean> - True if passwords match, false otherwise
   */
  async comparePassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }

  /**
   * Generate a salt with the specified rounds
   * @param saltRounds - Number of salt rounds (default: 10)
   * @returns Promise<string> - The generated salt
   */
  async generateSalt(saltRounds: number = 10): Promise<string> {
    return bcrypt.genSalt(saltRounds);
  }

  /**
   * Hash a password with a specific salt
   * @param password - The password to hash
   * @param salt - The salt to use for hashing
   * @returns Promise<string> - The hashed password
   */
  async hashPasswordWithSalt(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }

  /**
   * Get the number of rounds used in a hash
   * @param hash - The hash to analyze
   * @returns number - The number of rounds used
   */
  getRounds(hash: string): number {
    return bcrypt.getRounds(hash);
  }
}
