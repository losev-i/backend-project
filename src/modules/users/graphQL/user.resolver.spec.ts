import test from 'ava';
import { stub, spy } from 'sinon';
import proxyquire from 'proxyquire';
import faker from 'faker';
import { PlainUser } from '../../shared/plain-user-object';
import { Role } from '../classes/role';

const testUser = new PlainUser();
testUser.id = '1';
testUser.name = faker.internet.userName();
testUser.password = faker.internet.password();
testUser.email = faker.internet.email();
testUser.firstName = faker.name.firstName();
testUser.lastName = faker.name.lastName();
testUser.role = Role.GUEST;

const testUsers = [testUser];

const UserModelMock = {
  findUsers: async function() {
    return testUsers;
  }
};

const mw = proxyquire('./user.resolver', { './user.model': UserModelMock });

test('find users', async t => {
  const ctx: { body: any } = { body: null };
  const userFindSpy = spy(UserModelMock, 'findUsers');

  const next = stub().returns(Promise.resolve());

  const response = await mw.findUsers;

  console.log(response);

  t.truthy(userFindSpy.called);
  t.deepEqual(ctx.body, testUsers);
  t.truthy(next.calledOnce);
});
