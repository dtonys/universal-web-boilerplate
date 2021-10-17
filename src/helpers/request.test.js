const rewire = require("rewire")
const request = rewire("./request")
const getPath = request.__get__("getPath")
// @ponicode
describe("getPath", () => {
    test("0", () => {
        let callFunction = () => {
            getPath("https://api.telegram.org/bot", "http", "UPDATE Projects SET pname = %s WHERE pid = %s")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            getPath("ponicode.com", -10, "DROP TABLE tmp;")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            getPath("http://www.example.com/route/123?foo=bar", "https://api.telegram.org/bot", "UPDATE Projects SET pname = %s WHERE pid = %s")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            getPath("www.google.com", "https://", "UNLOCK TABLES;")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            getPath("https://api.telegram.org/", "www.google.com", "SELECT * FROM Movies WHERE Title=’Jurassic Park’ AND Director='Steven Spielberg';")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            getPath("", NaN, "")
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("request.default", () => {
    test("0", () => {
        let callFunction = () => {
            request.default({ headers: { cookie: "foo bar" } })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            request.default({ headers: { cookie: "Hello, world!" } })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            request.default({ headers: { cookie: "Foo bar" } })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            request.default({ headers: { cookie: "This is a Text" } })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            request.default(undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})
