import faker from 'faker';
import { v4 } from 'uuid';
import { times } from 'lodash';

module.exports = times(3).map(() => ({
  id: v4(),
  title: faker.company.catchPhrase(),
  starred: false,
  createAt: Date.now(),
  updateAt: Date.now(),
}));
