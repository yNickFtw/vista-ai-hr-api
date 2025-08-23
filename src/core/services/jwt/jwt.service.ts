import { Injectable } from "@nestjs/common";
import * as jwt from "jsonwebtoken";

export interface JwtPayload {
  sub: string;
  email: string;
  name: string;
  iat?: number;
  exp?: number;
}

@Injectable()
export class JwtService {
  private readonly secretKey = process.env.JWT_SECRET || "your-secret-key";
  private readonly expiresIn = process.env.JWT_EXPIRES_IN || "24h";

  /**
   * Generate a JWT token
   * @param payload - The payload to encode in the token
   * @returns The generated JWT token
   */
  generateToken(payload: Omit<JwtPayload, "iat" | "exp">): string {
    return jwt.sign(payload, this.secretKey, {
      expiresIn: this.expiresIn,
    } as jwt.SignOptions);
  }

  /**
   * Verify and decode a JWT token
   * @param token - The JWT token to verify
   * @returns The decoded payload if valid
   * @throws Error if token is invalid or expired
   */
  verifyToken(token: string): JwtPayload {
    try {
      return jwt.verify(token, this.secretKey) as JwtPayload;
    } catch (error) {
      throw new Error("Invalid or expired token");
    }
  }

  /**
   * Decode a JWT token without verification
   * @param token - The JWT token to decode
   * @returns The decoded payload (not verified)
   */
  decodeToken(token: string): JwtPayload | null {
    try {
      return jwt.decode(token) as JwtPayload;
    } catch (error) {
      return null;
    }
  }

  /**
   * Extract token from Authorization header
   * @param authHeader - The Authorization header value
   * @returns The token or null if not found
   */
  extractTokenFromHeader(authHeader: string): string | null {
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return null;
    }
    return authHeader.substring(7);
  }

  /**
   * Check if a token is expired
   * @param token - The JWT token to check
   * @returns True if expired, false otherwise
   */
  isTokenExpired(token: string): boolean {
    try {
      const decoded = jwt.decode(token) as JwtPayload;
      if (!decoded || !decoded.exp) {
        return true;
      }
      return Date.now() >= decoded.exp * 1000;
    } catch (error) {
      return true;
    }
  }

  /**
   * Refresh a token if it's about to expire
   * @param token - The current JWT token
   * @param thresholdMinutes - Minutes before expiration to refresh (default: 30)
   * @returns New token if refresh needed, null otherwise
   */
  refreshTokenIfNeeded(token: string, thresholdMinutes: number = 30): string | null {
    try {
      const decoded = jwt.decode(token) as JwtPayload;
      if (!decoded || !decoded.exp) {
        return null;
      }

      const expirationTime = decoded.exp * 1000;
      const thresholdTime = Date.now() + (thresholdMinutes * 60 * 1000);

      if (expirationTime <= thresholdTime) {
        // Token is about to expire, generate new one
        const { sub, email, name } = decoded;
        return this.generateToken({ sub, email, name });
      }

      return null;
    } catch (error) {
      return null;
    }
  }
}
