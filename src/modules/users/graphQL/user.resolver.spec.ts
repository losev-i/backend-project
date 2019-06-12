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

function registerResultConstructor(user: any) {
  let registerResult: ExecutionResult<ExecutionResultDataDefault> = {
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
  return registerResult;
}

test('user: register: successful', async t => {
  let testUser = createUser(Role.ADMIN);
  let registerResult = registerResultConstructor(testUser);

  const expected = await call({
    source: registerMutation,
    variableValues: {
      data: testUser
    }
  });

  t.deepEqual(registerResult, expected);
});

test('user: register: fail', async t => {
  let role: Role = Role.ADMIN;
  let testUser = createUser(role);
  let registerResult = registerResultConstructor(testUser);

  const expected = await call({
    source: registerMutation,
    variableValues: {
      data: testUser
    }
  });

  if (registerResult.data) {
    registerResult.data.register.role = Role.GUEST;
  }

  t.notDeepEqual(registerResult, expected);
});

// TODO: error verification is bad, empty result could have other
// possible results besides dublicate error
test.skip('user: register: throw dublicate error', async t => {
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

  const empty: ExecutionResult<ExecutionResultDataDefault> = {
    data: undefined
  };

  t.deepEqual(empty.data, expected.data);
});

test.skip('user: register: Syntax error: empty string for name', async t => {
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
  if (expected.errors) {
    t.regex(expected.errors[0].message, /Syntax Error/);
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

function findResultConstructor(user: any) {
  const findResult: ExecutionResult<ExecutionResultDataDefault> = {
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
  return findResult;
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
  const findResult = findResultConstructor(testUser);

  const expected = await call({ source: findQuery });

  t.deepEqual(findResult, expected);
});
