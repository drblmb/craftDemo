import {
  required,
} from './validators';

describe('Validators', () => {
  describe('required()', () => {
    it('should return undefined when value is passed', () => {
      expect(required('test')).toEqual(undefined);
      expect(required(false)).toEqual(undefined);
    });

    it('should return an error when value is empty', () => {
      expect(required(null)).toEqual('Required');
      expect(required(undefined)).toEqual('Required');
      expect(required('')).toEqual('Required');
      expect(required(' ')).toEqual('Required');
    });
  });
});
