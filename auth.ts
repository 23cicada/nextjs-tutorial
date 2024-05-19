import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';

import { sql } from '@vercel/postgres';
import type { User } from '@/app/lib/definitions';
import bcrypt from 'bcrypt';

async function getUser(email: string): Promise<User | undefined> {
  try {
    const user = await sql<User>`SELECT * FROM users WHERE email=${email}`;
    return user.rows[0];
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}
 
// signIn : 使用provider登录
// signOut : 注销用户
export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    // Credentials Provider 允许使用任意凭据进行登录，如用户名和密码
    Credentials({
      // authorize : 处理用户提供的凭证
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);
        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          const user = await getUser(email);
          if (!user) return null;
          // bcrypt.compare : 检查密码是否匹配
          const passwordsMatch = await bcrypt.compare(password, user.password);
 
          // 默认情况下，用户登录后会重定向到当前页面（调用middleware）
          if (passwordsMatch) return user;
        }

        console.log('Invalid credentials');
        return null;
        // 如果抛出 CredentialsSignin 或 return null :
        // 重定向到登录页
        // 如果在服务端表单操作中，则登录表单操作会抛出此错误
      },
    }),
  ],
});