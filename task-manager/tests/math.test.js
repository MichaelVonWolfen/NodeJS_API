const math = require("../src/math");

jest.setTimeout(1000);

test("Convert C to F", () => {
  expect(math.celsiusToFahrenheit(0)).toBe(32);
});
test("Convert F to C", () => {
  expect(math.fahrenheitToCelsius(32)).toBe(0);
});
test("Async", (done) => {
  setTimeout(() => {
    expect(1).toBe(1);
    done();
  }, 400);
});
