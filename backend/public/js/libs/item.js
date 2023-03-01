// Xây dựng một dự án để tự động sắp xếp các items
class Type {
    constructor(name, cost, image) {
        this.name = name;
        this.cost = cost; // $/1px
        this.image = image;
    }
}

const Gemstone = {
	Gold: Type("Gold", 1.0, loadImage('./img/gemstones/gold.png')),
	Diamond: Type("Diamond", 1.0, loadImage('./img/gemstones/diamond.png')),
	Sapphire: Type("Sapphire", 1.0, loadImage('./img/gemstones/sapphire.png')),
	Opal: Type("Opal", 1.0, loadImage('./img/gemstones/opal.png')),
	Ruby: Type("Ruby", 1.0, loadImage('./img/gemstones/ruby.png')),
	Pearl: Type("Pearl", 1.0, loadImage('./img/gemstones/pearl.png')),
	Emerald: Type("Emerald", 1.0, loadImage('./img/gemstones/emerald.png')),
	Aquamarine: Type("Aquamarine", 1.0, loadImage('./img/gemstones/aquamarine.png')),
	Garnet: Type("Garnet", 1.0, loadImage('./img/gemstones/garnet.png')),
    Agate: Type("Agate", 1.0, loadImage('./img/gemstones/agate.png')),
    Marble: Type("Marble", 1.0, loadImage('./img/gemstones/marble.png')),
    Moonstone: Type("Moonstone", 1.0, loadImage('./img/gemstones/moonstone.png')),
    Obsidian: Type("Obsidian", 1.0, loadImage('./img/gemstones/obsidian.png')),
    Citrine: Type("Citrine", 1.0, loadImage('./img/gemstones/citrine.png')),
    TigerEye: Type("TigerEye", 1.0, loadImage('./img/gemstones/tiger_eye.png')),
    Malachite: Type("Malachite", 1.0, loadImage('./img/gemstones/malachite.png'))
}

class Item {
    constructor(center, size, type) {
        this.center = center;
        this.size = size; // trọng lượng của các item
        this.type = type;
    }

    updateLocation(claw, vector) {
        center = claw.add(vector)
    }

    draw(avatar) {
        imageMode(CENTER)
        image(avatar, this.center.x, this.center.y, size, size);
    }
}