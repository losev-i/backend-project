import test from 'ava';
import { testConnection } from '../../shared/test-utils/test-connection';
import { Connection } from 'typeorm';
import { call } from '../../shared/test-utils/call.graphql';
import { ExecutionResult } from 'graphql';
import faker from 'faker';
import { ExecutionResultDataDefault } from 'graphql/execution/execute';
import { Role } from '../classes/role';
import { PlainUser } from '../../shared/plain-user-object';

let conn: Connection;
test.before(async () => {
  conn = await testConnection();
});

test.after(async () => {
  await conn.close();
});

function createUser(role: Role) {
  let user = {
    name: faker.internet.userName(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    role: role
  };
  return user;
}

function registerMutationConstructor(user: any) {
  let registerMutation = `mutation {
    register(
      name: ${JSON.stringify(user.name)},
      firstName: ${JSON.stringify(user.firstName)},
      lastName: ${JSON.stringify(user.lastName)},
      email: ${JSON.stringify(user.email)},
      password: ${JSON.stringify(user.password)},
      role: ${JSON.stringify(user.role)} 
      )  {
      name
      firstName
      lastName
      email
      role
    }
  }
  `;

  return registerMutation;
}

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

test('user: register', async t => {
  let role: Role = Role.ADMIN;
  let testUser = createUser(role);
  let registerMutation = registerMutationConstructor(testUser);
  let registerResult = registerResultConstructor(testUser);

  const expected = await call({
    source: registerMutation
  });

  t.deepEqual(registerResult, expected);
});

test('user: register fail', async t => {
  let role: Role = Role.ADMIN;
  let testUser = createUser(role);
  let registerMutation = registerMutationConstructor(testUser);
  let registerResult = registerResultConstructor(testUser);

  const expected = await call({
    source: registerMutation
  });

  if (registerResult.data) {
    registerResult.data.register.role = Role.GUEST;
  }

  t.notDeepEqual(registerResult, expected);
});

// findQuery constructor
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

test('user: findUserByRole', async t => {
  let role: Role = Role.GUEST;
  let testUser = createUser(role);
  let registerMutation = registerMutationConstructor(testUser);

  await call({ source: registerMutation });

  const findQuery = findQueryConstructor(role);
  const findResult = findResultConstructor(testUser);

  const expected = await call({ source: findQuery });

  t.deepEqual(findResult, expected);
});
