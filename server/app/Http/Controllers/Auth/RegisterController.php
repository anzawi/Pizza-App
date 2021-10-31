<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Transformers\UserTransformer;
use Illuminate\Http\Request;

class RegisterController extends Controller
{
    public function __invoke(Request $request)
    {
        $this->validate($request, [
            'email' => 'required|email',
            'name' => 'required',
            'password' => 'required'
        ]);

        $data = [
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
        ];

        User::create($data);

        if (!$token = auth()->attempt($request->only('email', 'password'))) {
            return abort(401);
        }

        return fractal()
            ->item(auth()->user())
            ->transformWith(new UserTransformer($token))
            ->toArray();
    }
}
