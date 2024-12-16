// sin modificar la clase item
class Item {
  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

class Shop {
  constructor(items = []) {
    this.items = items;
  }
  // "Aged Brie" "Backstage passes to a TAFKAL80ETC concert" "Sulfuras, Hand of Ragnaros" "Conjured Mana Cake"
  // item.name items.sellIn item.quality
  // nueva solucion
  updateQuality() {
    for (var i = 0; i < this.items.length; i++) {
      let item = this.items[i]

      switch (item.name) {
        case "Sulfuras, Hand of Ragnaros":

          continue;
        case "Aged Brie":
          updateBrie(item)
          break;
        case "Backstage passes to a TAFKAL80ETC concert":
          updatePasses(item)
          break;
        case item.name.toLowerCase().includes("conjured"):
          updateConjured(item)
          break;
        default:
          udateNormalItem(item)
          break;
      }
    }
    return this.items;
  }
  updateBrie(item) {
    item.quality = Math.min(50, item.quality + 1)
    item.sellIn--
    if (item.sellIn < 0) {
      item.quality = Math.min(50, item.quality + 2)
      item.sellIn--
    }
  }
  updatePasses(item) {
    if (item.sellIn < 0) {
      item.quality = 0
      item.sellIn--
    } else {
      item.quality = + 1
      if (item.sellIn < 10) {
        item.quality = Math.min(50, item.quality + 2)
        item.sellIn--
      } else if (item.sellIn < 5) {
        item.quality = Math.min(50, item.quality + 3)
        item.sellIn--
      }
    }
  }
  updateConjured(item) {
    item.quality = Math.max(0, item.quality - 2)
    item.sellIn--
    if (item.sellIn < 0) {
      item.quality = Math.max(0, item.quality - 4)
      item.sellIn--
    }
  }
  udateNormalItem(item) {
    item.quality = Math.max(0, item.quality - 1)
    item.sellIn-- 
    if (item.sellIn < 0) {
      item.quality = Math.max(0, item.quality - 2)
      item.sellIn--
    }
  }
}
module.exports = {
  Item,
  Shop
}
