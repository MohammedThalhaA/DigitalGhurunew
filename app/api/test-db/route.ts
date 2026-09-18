import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import PostgresAdapter from '@auth/pg-adapter';
import { authOptions } from '@/lib/auth';

export async function GET() {
  try {
    const adapter = authOptions.adapter as any;
    const results: any = {};
    
    // 1. Get User by Email
    const email = 'mohammedthalha177@gmail.com';
    const user = await adapter.getUserByEmail(email);
    results.user = user;
    
    if (user) {
      // 2. Test linkAccount (Simulate)
      const dummyAccount = {
        userId: user.id,
        type: 'oauth',
        provider: 'google',
        providerAccountId: 'test-google-id-' + Date.now(),
        access_token: 'dummy',
        token_type: 'Bearer',
        id_token: 'dummy',
        refresh_token: null,
        scope: 'openid',
        expires_at: Math.floor(Date.now() / 1000) + 3600,
        session_state: null
      };
      
      try {
        await adapter.linkAccount(dummyAccount);
        results.linkAccount = 'Success';
      } catch (err: any) {
        results.linkAccountError = err.message;
      }
    } else {
       results.error = "User not found";
    }

    // Also check updateUser
    try {
        if(user) {
            await adapter.updateUser({ id: user.id, emailVerified: new Date() });
            results.updateUser = 'Success';
        }
    } catch(err: any) {
        results.updateUserError = err.message;
    }

    return NextResponse.json(results);
  } catch (error: any) {
    return NextResponse.json({ error: error.message, stack: error.stack }, { status: 500 });
  }
}
