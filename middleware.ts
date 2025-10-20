import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Маршрути, які доступні тільки НЕавторизованим користувачам
const publicRoutes = ['/sign-in', '/sign-up'];

// Маршрути, які доступні тільки авторизованим користувачам
const privateRoutes = ['/profile', '/notes', '/favorites'];

export function middleware(request: NextRequest) {
  const token = request.cookies.get('accessToken')?.value;

  const { pathname } = request.nextUrl;

  // --- Якщо користувач неавторизований і відкриває приватну сторінку
  if (!token && privateRoutes.some((route) => pathname.startsWith(route))) {
    const loginUrl = new URL('/sign-in', request.url);
    return NextResponse.redirect(loginUrl);
  }

  // --- Якщо користувач авторизований і намагається відкрити сторінку входу або реєстрації
  if (token && publicRoutes.some((route) => pathname.startsWith(route))) {
    const profileUrl = new URL('/profile', request.url);
    return NextResponse.redirect(profileUrl);
  }

  // --- Інакше пропускаємо далі
  return NextResponse.next();
}

// --- Налаштовуємо, які маршрути перевіряти
export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|api|images|.*\\.svg$).*)',
  ],
};
