<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cookie;
use Symfony\Component\HttpFoundation\Response;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthController extends Controller
{
    public function login()
    {
        $credentials = request(['email', 'password']);

        if (!$token = auth('api')->attempt($credentials)) {
            return response()->json(['error' => 'Sai tên đăng nhập hoặc mật khẩu'], Response::HTTP_UNAUTHORIZED);
        }

        $user = auth('api')->user();
        $refreshTokenData = $this->setRefreshTokenData($user);

        $refresh_token = JWTAuth::getJWTProvider()->encode($refreshTokenData);
        $cookie = $this->setTokenAndRefreshToken($token, $refresh_token, $user);
        $tokenCookie = $cookie['tokenCookie'];
        $refreshTokenCookie = $cookie['refreshTokenCookie'];

        return $this->respondWithToken($token, $refresh_token, $user)->withCookie($tokenCookie)->withCookie($refreshTokenCookie);
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

    public function refresh(Request $request)
    {
        try {
            if ($request->hasCookie('access_token')) {
                $token = $request->cookie('access_token');
                $request->headers->set('Authorization', 'Bearer ' . $token);
            }
            $user = JWTAuth::parseToken()->authenticate();
            $token = auth('api')->refresh();
            auth('api')->invalidate(true);

            $refreshTokenData = $this->setRefreshTokenData($user);
            $refresh_token = JWTAuth::getJWTProvider()->encode($refreshTokenData);
            $cookie = $this->setTokenAndRefreshToken($token, $refresh_token, $user);
            $tokenCookie = $cookie['tokenCookie'];
            $refreshTokenCookie = $cookie['refreshTokenCookie'];
            return $this->respondWithToken($token, $refresh_token, $user)->withCookie($tokenCookie)->withCookie($refreshTokenCookie);

        } catch (TokenExpiredException $e) {
            if ($request->hasCookie('refresh_token')) {
                $refreshTokenCookie = $request->cookie('refresh_token');
                $refreshTokenCookieDecode = JWTAuth::getJWTProvider()->decode($refreshTokenCookie);
                $user = User::find($refreshTokenCookieDecode['user_id']);
                $token = auth('api')->login($user);

                $refreshTokenData = $this->setRefreshTokenData($user);
                $refreshTokenDataEncode = JWTAuth::getJWTProvider()->encode($refreshTokenData);

                $cookie = $this->setTokenAndRefreshToken($token, $refreshTokenDataEncode, $user);

                return $this->respondWithToken($token, $refreshTokenDataEncode, $user)->withCookie($cookie['tokenCookie'])->withCookie($cookie['refreshTokenCookie']);
            }

            return response()->json(['message' => 'Cookie không tồn tại '], Response::HTTP_UNAUTHORIZED);
        } catch (JWTException $e) {
            return response()->json(['message' => 'Token không hợp lệ'], Response::HTTP_UNAUTHORIZED);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Token không tồn tại'], Response::HTTP_UNAUTHORIZED);
        }
    }


    protected function respondWithToken($token, $refresh_token, $user)
    {
        return response()->json([
            'access_token' => $token,
            'user' => new UserResource($user),
            'refresh_token' => $refresh_token,
            'token_type' => 'bearer',
            'expires_in' => time() + 1
        ]);
    }

    private function setTokenAndRefreshToken($token, $refresh_token, $user)
    {
        $refreshTokenCookie = Cookie::make(
            'refresh_token',
            $refresh_token,
            config('jwt.refresh_ttl'),
            '/',
            null,
            true,
            true,
            false,
            'None'
        );

        $cookie = Cookie::make(
            'access_token',
            $token,
            auth('api')->factory()->getTTL() * 60 * 24, // 1 ngày
            '/',
            null,
            true,
            true,
            false,
            'None'
        );

        return [
            'tokenCookie' => $cookie,
            'refreshTokenCookie' => $refreshTokenCookie
        ];
    }

    private function setRefreshTokenData($user)
    {
        $refreshTokenData = [
            'user_id' => $user->id,
            'expires_in' => time() * config('jwt.refresh_ttl')
        ];

        return $refreshTokenData;
    }
}
