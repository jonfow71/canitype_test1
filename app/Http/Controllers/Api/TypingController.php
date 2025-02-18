<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class TypingController extends Controller
{
    public function getData()
    {
        $data = [
            "StrP1" => [
                "I1" => ["A big appreciation to you", "A big thank you"],
                "I2" => ["for the"],
                "I3" => ["account", "advertisement", "advice"],
                "I4" => ["you sent", "you provided"],
                "I5" => ["yesterday", "last week", "this morning"]
            ]
        ];

        return response()->json($data);
    }
}
