// middleware.ts

import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { parse } from 'cookie';
import { checkSessionServer } from './lib/api/serverApi';

const privateRoutes = ['/profile', '/notes'];
const authRoutes = ['/sign-in', '/sign-up'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const cookieStore = await cookies();

  const accessToken = cookieStore.get('accessToken')?.value;
  const refreshToken = cookieStore.get('refreshToken')?.value;

  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));
  const isPrivateRoute = privateRoutes.some((route) =>
    pathname.startsWith(route),
  );

  // Якщо accessToken відсутній
  if (!accessToken) {
    if (refreshToken) {
      // Пробуємо оновити сесію через refreshToken
      const response = await checkSessionServer();
      const setCookie = response.headers['set-cookie'];

      if (setCookie) {
        const cookieArray = Array.isArray(setCookie) ? setCookie : [setCookie];

        for (const cookieStr of cookieArray) {
          const parsed = parse(cookieStr);
          const options = {
            expires: parsed.Expires ? new Date(parsed.Expires) : undefined,
            path: parsed.Path,
            maxAge: parsed['Max-Age'] ? Number(parsed['Max-Age']) : undefined,
          };

          if (parsed.accessToken)
            cookieStore.set('accessToken', parsed.accessToken, options);
          if (parsed.refreshToken)
            cookieStore.set('refreshToken', parsed.refreshToken, options);
        }

        // Якщо користувач авторизований, але намагається відкрити сторінку входу/реєстрації
        if (isAuthRoute) {
          return NextResponse.redirect(new URL('/', request.url), {
            headers: { Cookie: cookieStore.toString() },
          });
        }

        // Якщо користувач на приватному маршруті — дозволяємо доступ
        if (isPrivateRoute) {
          return NextResponse.next({
            headers: { Cookie: cookieStore.toString() },
          });
        }
      }
    }

    // Якщо refreshToken або сесії немає
    if (isPrivateRoute) {
      return NextResponse.redirect(new URL('/sign-in', request.url));
    }

    if (isAuthRoute) {
      return NextResponse.next();
    }
  }

  // Якщо користувач вже авторизований
  if (isAuthRoute) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  if (isPrivateRoute) {
    return NextResponse.next();
  }

  return NextResponse.next();
}

// --- matcher для middleware
export const config = {
  matcher: ['/profile/:path*', '/notes/:path*', '/sign-in', '/sign-up'],
};

// // middleware.ts;

// import { NextResponse } from 'next/server';
// import type { NextRequest } from 'next/server';

// // Маршрути, які доступні тільки НЕавторизованим користувачам
// const publicRoutes = ['/sign-in', '/sign-up'];

// // Маршрути, які доступні тільки авторизованим користувачам
// const privateRoutes = ['/profile', '/notes', '/favorites'];

// export function middleware(request: NextRequest) {
//   const token = request.cookies.get('accessToken')?.value;

//   const { pathname } = request.nextUrl;

//   // --- Якщо користувач неавторизований і відкриває приватну сторінку
//   if (!token && privateRoutes.some((route) => pathname.startsWith(route))) {
//     const loginUrl = new URL('/sign-in', request.url);
//     return NextResponse.redirect(loginUrl);
//   }

//   // --- Якщо користувач авторизований і намагається відкрити сторінку входу або реєстрації
//   if (token && publicRoutes.some((route) => pathname.startsWith(route))) {
//     const profileUrl = new URL('/profile', request.url);
//     return NextResponse.redirect(profileUrl);
//   }

//   // --- Інакше пропускаємо далі
//   return NextResponse.next();
// }

// // --- Налаштовуємо, які маршрути перевіряти
// export const config = {
//   matcher: [
//     '/((?!_next/static|_next/image|favicon.ico|api|images|.*\\.svg$).*)',
//   ],
// };
