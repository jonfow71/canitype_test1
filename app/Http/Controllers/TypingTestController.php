<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;

class TypingTestController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function getData()
    {
        $jsonPath = database_path('data/typingContent.json');
        
        try {
            if (File::exists($jsonPath)) {
                $jsonData = File::get($jsonPath);
                return response()->json(json_decode($jsonData, true));
            }
            
            return response()->json(['error' => 'Typing content file not found'], 404);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error loading typing content'], 500);
        }
    }

    public function index()
    {
        return view('typing.index');
    }
}
