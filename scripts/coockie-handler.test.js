const setCookie = require("./coockie-handler");
const getCookie = require("./coockie-handler");

//document.coockie is not accesible outside of browser environment, need to find ways around that
test("properly sets coockie", () =>{
    expect(setCookie("coockie", "value", 1)).toBe("coockie=value");
});

