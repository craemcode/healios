<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'name',
        'category',
        'price',
        'image_path',
        'description'
    ];
    //product belongs to seller
    public function seller()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    //a product has many stock movements.
    public function stockMovements()
    {
        return $this->hasMany(StockMovement::class);
    }

    //this function returns a full url of a product photograph.
    public function getPhotoUrlAttribute(){
        return $this->image_path 
        ? asset('storage/' . $this->image_path) : null;
    }

    public function getCurrentStockAttribute()
    {
        $in = $this->stockMovements()->where('type', 'restock')->sum('quantity');
        $out = $this->stockMovements()->where('type', 'sale')->sum('quantity');

        return $in - $out;
    }

    



}
