class House {
    private window: string;
    private roof: string;
    private wall: string;
    private door: string;
    private pool: string;

    constructor(builderObj: HouseBuilder) {
        this.window = builderObj.window || "";
        this.roof = builderObj.roof || "";
        this.door = builderObj.door || "";
        this.pool = builderObj.pool || "";
        this.wall = builderObj.wall || "";
    }

    public getHouseDescription(): string {
        let description: string = "";
        if (this.window) description += this.window + " ";
        if (this.roof) description += this.roof + " ";
        if (this.pool) description += this.pool + " ";
        if (this.door) description += this.door + " ";
        if (this.wall) description += this.wall + " ";
        return description;
    }
}

class HouseBuilder {
    public window: string = "";
    public roof: string = "";
    public wall: string = "";
    public door: string = "";
    public pool: string = "";

    constructor() {}

    public buildWindow(_window: string): HouseBuilder {
        this.window = _window;
        return this;
    }

    public buildRoof(_roof: string): HouseBuilder {
        this.roof = _roof;
        return this;
    }

    public buildDoor(_door: string): HouseBuilder {
        this.door = _door;
        return this;
    }

    public buildPool(_pool: string): HouseBuilder {
        this.pool = _pool;
        return this;
    }

    public buildWall(_wall: string): HouseBuilder {
        this.wall = _wall;
        return this;
    }

    public build(): House {
        return new House(this);
    }
}

class Director {
    constructor() {}

    public houseWithPool(): House {
        return new HouseBuilder()
            .buildDoor("door1")
            .buildPool("pool1")
            .buildRoof("roof1")
            .buildWindow("window1")
            .buildWall("wall1")
            .build();
    }

    public houseWithoutPool(): House {
        return new HouseBuilder()
            .buildDoor("door2")
            .buildRoof("roof2")
            .buildWindow("window2")
            .buildWall("wall2")
            .build();
    }
}

function main4() {
    let directorObj = new Director();

    const housePool: House = directorObj.houseWithPool();
    console.log(housePool.getHouseDescription());

    const houseWithoutPool: House = directorObj.houseWithoutPool();
    console.log(houseWithoutPool.getHouseDescription());
}

main4();