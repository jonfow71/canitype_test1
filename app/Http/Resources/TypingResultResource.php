<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

// app/Http/Resources/TypingResultResource.php
class TypingResultResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'wpm' => $this->wpm,
            'accuracy' => $this->accuracy,
            'total_characters' => $this->total_characters,
            'errors' => $this->errors,
            'created_at' => $this->created_at->toDateTimeString()
        ];
    }
}



