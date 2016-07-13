import expect from "expect";

describe("Simple math", () => {
    it("5+5 = 10", () => {
        const a = 5;
        const b = 5;
        let actual = a + b;
        let expected = 10;

        expect(actual).toEqual(expected);
    });
});