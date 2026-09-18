import 'dotenv/config';
import pool from './lib/db';
import { authOptions } from './lib/auth';

async function test() {
  try {
    const adapter = authOptions.adapter as any;
    console.log("1. Testing getUserByEmail");
    const user = await adapter.getUserByEmail('mohammedthalha177@gmail.com');
    console.log("User found:", user);

    if (user) {
      console.log("2. Testing linkAccount");
      const account = {
        userId: user.id,
        type: 'oauth',
        provider: 'google',
        providerAccountId: '1234567890',
        access_token: 'dummy_token',
        token_type: 'Bearer',
        id_token: 'dummy_id_token',
        refresh_token: null,
        scope: 'openid email profile',
        expires_at: Math.floor(Date.now() / 1000) + 3600,
        session_state: null
      };
      
      const res = await adapter.linkAccount(account);
      console.log("Link account result:", res);
    } else {
      console.log("User not found, testing createUser");
      const newUser = await adapter.createUser({
        name: "Test User",
        email: "test@example.com",
        emailVerified: new Date(),
        image: "http://example.com/image.png"
      });
      console.log("New user:", newUser);
    }

  } catch (error) {
    console.error("Test failed:", error);
  } finally {
    process.exit(0);
  }
}

test();
