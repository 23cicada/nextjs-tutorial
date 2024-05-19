import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  // pages : 自定义登录、登出和错误页面，使用指定的URL覆盖相对应的内置页面
  // signIn, signOut, error
  pages: {
    signIn: '/login'
  },
  // callbacks : 控制在执行与身份验证相关的操作时会发生什么
  callbacks: {
    // authorized : 当用户需要使用中间件进行授权时调用。身份验证由 callbacks.authorized 回调完成
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; // 重定向到登录页
      } else if (isLoggedIn) {
        //  redirect 是通过抛出一个错误来工作的，而 catch 块会捕获这个错误
        return Response.redirect(new URL('/dashboard', nextUrl));
      }
      return true;
    },
  },
  providers: [] // 用于登录的身份验证提供程序列表
} satisfies NextAuthConfig
// satisfies : 验证表达式的类型是否与某种类型相匹配，而不会改变表达式的结果类型