import test from 'ava';
import { testConnection } from '../../shared/test-utils/test-connection';
import { Connection } from 'typeorm';
import { call } from '../../shared/test-utils/call.graphql';
import { ExecutionResult } from 'graphql';
import faker from 'faker';
import { ExecutionResultDataDefault } from 'graphql/execution/execute';
import { Role } from '../classes/role';

let conn: Connection;
test.before(async () => {
  conn = await testConnection();
});

test.after(async () => {
  await conn.close();
});

function createUser(role?: Role) {
  let user = {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    name: faker.internet.userName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    role: role ? role : Role.GUEST
  };
  return user;
}
const registerMutation = `mutation Register($data: registerInput!) {
  register(
    data: $data
  ) {
    name
    firstName
    lastName
    email
    role
  }
}
  `;

/*
@param value: what the test result should be
@param expected: what the test result actually is
*/

function registerValueConstructor(user: any) {
  let value: ExecutionResult<ExecutionResultDataDefault> = {
    data: {
      register: {
        name: user.name,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role
      }
    }
  };
  return value;
}

test('user: register: successful', async t => {
  let testUser = createUser(Role.ADMIN);
  let value = registerValueConstructor(testUser);

  const expected = await call({
    source: registerMutation,
    variableValues: {
      data: testUser
    }
  });

  t.deepEqual(value, expected);
});

test('user: register: fail', async t => {
  let role: Role = Role.ADMIN;
  let testUser = createUser(role);
  let value = registerValueConstructor(testUser);

  const expected = await call({
    source: registerMutation,
    variableValues: {
      data: testUser
    }
  });

  if (value.data) {
    value.data.register.role = Role.GUEST;
  }

  t.notDeepEqual(value, expected);
});

// TODO: error verification is bad, empty result could have other
// possible results besides dublicate error
test('user: register: duplicate name error', async t => {
  let role: Role = Role.ADMIN;
  let testUser1 = createUser(role);

  await call({
    source: registerMutation,
    variableValues: {
      data: testUser1
    }
  });

  let testUser2 = createUser(role);
  testUser2.name = testUser1.name;

  const expected = await call({
    source: registerMutation,
    variableValues: {
      data: testUser2
    }
  });

  // TODO: need to change if clause, else might not run test
  // maybe initialize expected beforehand

  if (expected.errors) {
    t.regex(expected.errors[0].message, /Duplicate entry/);
  }
});

test('user: register: Argument Validation Error: empty string for name', async t => {
  let role: Role = Role.ADMIN;
  let testUser = createUser(role);
  testUser.name = '';

  const expected = await call({
    source: registerMutation,
    variableValues: {
      data: testUser
    }
  });

  // TODO: need to change if clause, else might not run test
  // maybe initialize expected beforehand
  if (expected.errors) {
    t.regex(expected.errors[0].message, /Argument Validation Error/);
  }
});

function findQueryConstructor(searchCriteria: string) {
  const findQuery = `{
    findUserBy(search: ${JSON.stringify(searchCriteria)}) {
      name
      firstName
      lastName
      email
      role
    }
  }
  `;
  return findQuery;
}

function findValueConstructor(user: any) {
  const value: ExecutionResult<ExecutionResultDataDefault> = {
    data: {
      findUserBy: [
        {
          name: user.name,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          role: user.role
        }
      ]
    }
  };
  return value;
}

test('user: findUsers: Role', async t => {
  let testUser = createUser(Role.GUEST);

  await call({
    source: registerMutation,
    variableValues: {
      data: testUser
    }
  });

  const findQuery = findQueryConstructor(Role.GUEST);
  const value = findValueConstructor(testUser);

  const expected = await call({ source: findQuery });

  t.deepEqual(value, expected);
});
