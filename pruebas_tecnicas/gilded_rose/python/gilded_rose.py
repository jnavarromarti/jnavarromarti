# -*- coding: utf-8 -*-

class GildedRose(object):

    def __init__(self, items):
        self.items = items

    def update_quality(self):  #switch structure solution
        for item in self.items:
            match item.name:
                case "Aged Brie":
                    if item.sell_in > 0:
                        item.quality = min(50, item.quality + 1)
                        item.sell_in -= 1
                    else:
                        item.quality = min(50, item.quality + 2)
                        item.sell_in -= 1
                case "Backstage passes to a TAFKAL80ETC concert":
                    match item.sell_in:
                        case sell_in if sell_in > 10:
                            item.quality = min(50, item.quality + 1)
                            item.sell_in -= 1
                        case sell_in if 5 < sell_in <= 10:
                            item.quality = min(50, item.quality + 2)
                            item.sell_in -= 1
                        case sell_in if 0 < sell_in <= 5:
                            item.quality = min(50, item.quality + 3)
                            item.sell_in -= 1
                        case sell_in if sell_in <= 0:
                            item.quality = 0
                            item.sell_in -= 1
                case "Conjured Mana Cake":
                    if item.quality > 0:
                        item.quality -= 1
                        item.sell_in -= 1
                    elif item.sell_in < 0 and item.quality > 0:
                        item.quality -= 2
                        item.sell_in -= 1
                    elif item.sell_in <= 0 and item.quality <= 0:
                        item.quality = 0
                        item.sell_in -= 1
                case "Sulfuras, Hand of Ragnaros":
                    item.quality = item.quality
                    item.sell_in = item.sell_in
                case _:
                   match item.sell_in:
                       case sell_in if sell_in >= 0:
                        item.quality -= 1
                        item.sell_in -= 1
                       case sell_in if sell_in < 0:
                        item.quality = 0
                        item.sell_in -= 1


class Item:  # NO TOCAR
    def __init__(self, name, sell_in, quality):
        self.name = name
        self.sell_in = sell_in
        self.quality = quality

    def __repr__(self):
        return "%s, %s, %s" % (self.name, self.sell_in, self.quality)

