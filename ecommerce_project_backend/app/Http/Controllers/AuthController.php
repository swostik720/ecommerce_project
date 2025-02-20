<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Str;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        // Validate input data including reCAPTCHA token
        $validatedData = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => ['required', 'string', 'min:4'],
            'recaptcha_token' => ['required']
        ]);

        // Verify reCAPTCHA
        $response = Http::asForm()->post(env("GOOGLE_RECAPTCHA_URL"), [
            'secret' => env("GOOGLE_RECAPTCHA_SECRET"),
            'response' => $request->recaptcha_token,
            'remoteip' => $request->ip(),
        ]);

        if (!$response['success']) {
            return response()->json(['message' => 'reCAPTCHA verification failed.'], 422);
        }

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        return response()->json([
            'message' => 'User registered successfully',
            'user' => $user
        ], 201);
    }

    public function login(Request $request)
    {
        // Validate credentials and reCAPTCHA token
        $validatedData = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
            'recaptcha_token' => ['required']
        ]);

        // Verify reCAPTCHA
        $response = Http::asForm()->post(env("GOOGLE_RECAPTCHA_URL"), [
            'secret' => env("GOOGLE_RECAPTCHA_SECRET"),
            'response' => $request->recaptcha_token,
            'remoteip' => $request->ip(),
        ]);

        if (!$response['success']) {
            return response()->json(['message' => 'reCAPTCHA verification failed.'], 422);
        }

        if (Auth::attempt(['email' => $request->email, 'password' => $request->password])) {
            $user = Auth::user();
            $loginToken = $user->createToken('API Token')->plainTextToken;

            if ($user->is_admin) {
                return response()->json(['message' => 'Logged in successfully. Welcome admin', 'loginToken' => $loginToken, 'is_admin' => $user->is_admin], 200);
            } else {
                return response()->json(['message' => 'Logged in successfully. Welcome ' . $user->name,  'loginToken' => $loginToken, 'is_admin' => $user->is_admin], 200);
            }
        }

        return response()->json(['message' => 'Invalid credentials'], 401);
    }

    public function logout(Request $request)
    {
        // Ensure the user is authenticated
        if (!auth()->check()) {
            return response()->json(['message' => 'User is not authenticated'], 401);
        }

        // Revoke all tokens for the authenticated user
        auth()->user()->tokens()->delete();

        // Return success response
        return response()->json(['message' => 'Logged out successfully']);
    }

    public function sendPasswordResetLink(Request $request)
    {
        // Check if the user exists
        $user = User::where('email', $request->email)->first();

        if (!$user) {
            return response()->json(['message' => 'No user found with that email.'], 404);
        }

        // Create a unique token for the password reset
        $passwordResetToken = Str::random(60);

        // Store this token in the database (optional - useful for tracking resets)
        DB::table('password_resets')->insert([
            'email' => $request->email,
            'token' => $passwordResetToken,
            'created_at' => now(),
        ]);

        // Create custom reset link for the frontend
        $resetUrl = config('app.frontend_url') . '/createnewpassword?token=' . $passwordResetToken . '&email=' . urlencode($request->email);

        // Send raw email with custom message
        Mail::send([], [], function ($message) use ($request, $resetUrl) {
            $message->to($request->email)
                ->subject('Password Reset Request')
                ->html("
                <html>
                    <head>
                        <style>
                            body {
                                font-family: Arial, sans-serif;
                                background-color: #f4f4f4;
                                padding: 20px;
                            }
                            .container {
                                max-width: 600px;
                                background: #ffffff;
                                padding: 20px;
                                border-radius: 8px;
                                box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
                            }
                            .button {
                                display: inline-block;
                                padding: 10px 20px;
                                color: #ffffff;
                                background-color: #007bff;
                                text-decoration: none;
                                border-radius: 5px;
                                font-weight: bold;
                            }
                            .footer {
                                margin-top: 20px;
                                font-size: 12px;
                                color: #888888;
                            }
                        </style>
                    </head>
                    <body>
                        <div class='container'>
                            <h2>Password Reset Request</h2>
                            <p>We received a request to reset your password. Click the button below to reset it:</p>
                            <p><a href='{$resetUrl}' class='button'>Reset Password</a></p>
                            <p>If you did not request this, you can ignore this email.</p>
                            <p class='footer'>This link will expire in 60 minutes.</p>
                        </div>
                    </body>
                </html>
            ");
        });

        return response()->json([
            'message' => 'Password reset link sent to your email.',
            'passwordResetToken' => $passwordResetToken,
        ], 200);
    }

    public function resetPassword(Request $request)
    {
        // Check if the reset token exists in the database
        $reset = DB::table('password_resets')
            ->where('email', $request->email)
            ->where('token', $request->token)
            ->first();

        if (!$reset) {
            dd($request->passwordResetToken);
            return response()->json(['message' => 'Invalid or expired reset token.'], 400);
        }

        // Update the user's password
        $user = User::where('email', $request->email)->first();

        if ($user) {
            $user->password = bcrypt($request->password);
            $user->save();

            // Optionally delete the reset token after use
            DB::table('password_resets')->where('email', $request->email)->delete();

            return response()->json([
                'message' => 'Password reset successful.',
            ], 200);
        }

        return response()->json(['message' => 'User not found.'], 404);
    }
}
