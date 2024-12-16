<?php

declare(strict_types=1);

namespace GildedRose;

final class GildedRose
{
    /**
     * @param Item[] $items
     */
    public function __construct( 
        private array $items
    ) {}
    //Solucion de doble funcion y mas codigo optimizado
    public function updateQuality(): void
    {
        $specialItem = [
            'Aged Brie' => function ($item) {
                $item->quality = min(50, $item->quality + 1);
                $item->sellIn--;
                if ($item->sellIn <= 0) {
                    $item->quality = min(50, $item->quality + 2);
                }
            },
            'Backstage passes to a TAFKAL80ETC concert' => function ($item) {
                switch ($item->sellIn) {
                    case $item->sellIn > 10:
                        $item->quality++;
                        $item->sellIn--;
                    case 5 < $item->sellIn <= 10:
                        $item->quality = min(50, $item->quality + 2);
                        $item->sellIn--;
                    case $item->sellIn <= 5:
                        $item->quality = min(50, $item->quality + 3);
                        $item->sellIn--;
                    case $item->sellIn <= 0:
                        $item->quality == 0;
                        $item->sellIn--;
                }
            },
            'Sulfuras, Hand of Ragnaros' => function ($item) {
                $item->quality = $item->quality;
                $item->sellIn = $item->sellIn;
            },
            'Conjured Mana Cake' => function ($item) {
                do {
                    if ($item->sellIn > 0) {
                        $item->quality --;
                        $item->sellIn --;
                    } else{ 
                        $item->quality = $item->quality - 2;
                        $item->sellIn --;
                    }
                } while ($item->quality != 0);
                if ($item->quality <= 0) {
                    $item->quality = 0;
                    $item->sellIn --;
                } 
            }
        ];
        $defaultItem = function ($item){
            $item->quality = max(0, $item->quality - 1);
                $item->sellIn--;
                if ($item->sellIn <= 0) {
                    $item->quality = min(50, $item->quality - 1);
                }
        };
        foreach ($this->items as $item) {
            $handeler = $specialItem[$item->name] ?? $defaultItem;
            $handeler($item);
        }
    }
}
