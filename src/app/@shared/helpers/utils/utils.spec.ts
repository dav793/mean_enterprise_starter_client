
import Utils from './utils';

describe('Utils: createListLabel', () => {

  it('should generate label correctly', () => {

    const list = ['one', 'two', 'three'];
    const label = Utils.createListLabel(list);

    expect(label).toEqual('one, two, three');

  });

  beforeEach(() => {});

});
