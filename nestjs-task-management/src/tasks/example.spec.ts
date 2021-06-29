function AddNumbers(n1: number, n2: number) {
  return n1 + n2;
}
describe('Example Test', () => {
  it('equals true', () => {
    expect(true).toEqual(true);
    expect('Ariel').toEqual('Ariel');
  });
  it('is Ariel', () => {
    expect('Ariel').toEqual('Ariel');
  });
});
describe('Add numbers', () => {
  it('adds 2 numbers', () => {
    expect(AddNumbers(10, 30)).toBe(40);
  });
  it('differenciates 2 numbers', () => {
    expect(AddNumbers(10, -30)).toBe(-20);
  });
});
