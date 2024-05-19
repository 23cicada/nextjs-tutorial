import NextAuth from 'next-auth';
import { authConfig } from './auth.config';

// Middleware（中间件）: 中间件允许您在请求完成之前运行代码。
// 然后，根据传入的请求，您可以通过重写、重定向、修改请求或响应头，或直接响应来修改响应。
// 中间件在缓存内容和路由匹配之前运行。
// 在项目根目录下middleware.ts定义中间件
 
// auth : 在Next.js中与NextAuth.js交互的通用方法。
// 在初始化NextAuth.js后，在Middleware, ServerComponents等中使用此方法。
export default NextAuth(authConfig).auth;
 
export const config = {
  // 在指定的路由上运行Middleware
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};