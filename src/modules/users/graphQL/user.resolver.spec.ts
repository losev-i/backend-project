import test from 'ava';
import { testConnection } from '../../shared/test-utils/test-connection';
import { Connection } from 'typeorm';
import { call } from '../../shared/test-utils/call.graphql';
import { ExecutionResult } from 'graphql';
import faker from 'faker';
import { ExecutionResultDataDefault } from 'graphql/execution/execute';

let conn: Connection;
test.before(async () => {
  conn = await testConnection();
});

test.after(async () => {
  await conn.close();
});

let registerMutation: string;
let actual: ExecutionResult<ExecutionResultDataDefault>;

test.beforeEach(() => {
  const name = faker.internet.userName();
  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();
  const email = faker.internet.email();
  const password = faker.internet.password();
  const role = 'USER';

  registerMutation = `mutation {
    register(
      name: ${JSON.stringify(name)},
      firstName: ${JSON.stringify(firstName)},
      lastName: ${JSON.stringify(lastName)},
      email: ${JSON.stringify(email)},
      password: ${JSON.stringify(password)},
      role: ${JSON.stringify(role)} 
      )  {
      name
      firstName
      lastName
      email
      role
    }
  }
  `;

  actual = {
    data: {
      register: {
        name: name,
        firstName: firstName,
        lastName: lastName,
        email: email,
        role: role
      }
    }
  };
});

test('user: register', async t => {
  const expected = await call({
    source: registerMutation
  });

  t.deepEqual(actual, expected);
});
