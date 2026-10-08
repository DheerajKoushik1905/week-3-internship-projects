# JWT Authentication API

Implements user registration, login, password hashing with bcrypt, JWT token creation, and a protected profile route.

## Routes

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/profile` — requires `Authorization: Bearer <token>`
