const setNumber = require("./carousel");

 
test("function setNumber properly keeping number in specified range", () =>{
    expect(setNumber(10)).toBe(0);
    expect(setNumber(-1)).toBe(4);
    expect(setNumber(-10031)).toBe(4);
    expect(setNumber(1)).toBe(1);
    expect(setNumber(4)).toBe(4);
    expect(setNumber(0)).toBe(0);
    expect(setNumber(147820)).toBe(0);
})