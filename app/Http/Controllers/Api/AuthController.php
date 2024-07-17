<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Support\Facades\Cookie;
use Symfony\Component\HttpFoundation\Response;

class AuthController extends Controller
{
    public function login()
    {
        $credentials = request(['email', 'password']);

        if (!$token = auth('api')->attempt($credentials)) {
            return response()->json(['error' => 'Sai tên đăng nhập hoặc mật khẩu'], Response::HTTP_UNAUTHORIZED);
        }

        $cookie = Cookie::make(
            'access_token',
            $token,
            auth('api')->factory()->getTTL() * 60 * 24,
            '/',
            null,
            true,
            true,
            false,
            'None'
        );
        $user = auth('api')->user();
        return $this->respondWithToken($token, $user)->withCookie($cookie);
    }

    public function profile()
    {
        return response()->json(new UserResource(auth('api')->user()));
    }

    public function logout()
    {
        auth('api')->logout();

        return response()->json(['message' => 'Successfully logged out']);
    }

    // public function refresh()
    // {
    //     return $this->respondWithToken(auth()->refresh());
    // }


    protected function respondWithToken($token, $user)
    {
        return response()->json([
            'access_token' => $token,
            'user' => new UserResource($user),
            'token_type' => 'bearer',
            'expires_in' => auth('api')->factory()->getTTL() * 10
        ]);
    }
}
