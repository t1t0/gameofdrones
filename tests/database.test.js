var mongoose = require("mongoose");

var mongoDB = "mongodb+srv://m001-student:vem051903@cluster0-qvkdz.mongodb.net/godtest?retryWrites=true&w=majority";

mongoose.connect(mongoDB, {useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false,});

const Player = require("../src/models/players");

jest.setTimeout(30000)

describe("Player model test", () => {
    beforeAll(async () => {
        await Player.findOneAndRemove({"name": "Jest"});
        await Player.findOneAndRemove({"name": "Jest Test"});
    });

    afterEach(async () => {
        await Player.findOneAndRemove({"name": "Jest"});
        await Player.findOneAndRemove({"name": "Jest Test"});
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    it("has a module", () =>{
        expect(Player).toBeDefined();
    });

    it("Get Player", async () => {
        const newPlayer = new Player({name : "Jest", wons: 6, losts: 0});
        await newPlayer.save();
        const foundPlayer = await Player.findOne({ name: "Jest" });
        const expected = "Jest";
        const actual = foundPlayer.name;
        expect(actual).toEqual(expected);
    });

    it("Save a Player", async () => {
        const player = new Player({name : "Jest", wons: 6, losts: 0});
        const savedPlayer = await player.save();
        const expected = "Jest";
        const actual = savedPlayer.name;
        expect(actual).toEqual(expected);
    });

    it("Update a Player", async () => {
        const player = new Player({name : "Jest", wons: 6, losts: 0});
        await player.save();

        player.name = "Jest Test";
        const updatedPlayer = await player.save();

        const expected = "Jest Test";
        const actual = updatedPlayer.name;
        expect(actual).toEqual(expected);
    });
});