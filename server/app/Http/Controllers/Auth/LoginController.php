<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Transformers\UserTransformer;
use Illuminate\Http\Request;
use PhpParser\Node\Stmt\UseUse;

class LoginController extends Controller
{
    public function __construct()
    {
        $this->middleware('guest');
    }

    public function __invoke(Request $request)
    {
        $this->validate($request, [
            'email' => 'required|email',
            'password' => 'required'
        ]);
        if (!$token = auth()->attempt($request->only('email', 'password'))) {
            return abort(401);
        }

        return fractal()
            ->item(auth()->user())
            ->transformWith(new UserTransformer($token))
            ->toArray();
    }
}
