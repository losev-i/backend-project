import test from 'ava';
import { testConn } from '../../shared/test-utils/test-connection';
import { Connection } from 'typeorm';
import { call } from '../../shared/test-utils/call.graphql';
import { ExecutionResult } from 'graphql';
import { ExecutionResultDataDefault } from 'graphql/execution/execute';

let conn: Connection;
test.before(async () => {
  conn = await testConn();
});

test.after(async () => {
  await conn.close();
});

const registerMutation = `mutation {
  register(
    firstName: "Inna",
    lastName: "Losev",
    email: "i515@ev.de",
    name: "il",
    password: "12345",
    role: "ADMIN"
    )  {
    firstName
    lastName
    email
    name
    role
  }
}
`;

test('user: register', async t => {
  const expected = await call({
    source: registerMutation
  });

  let actual: ExecutionResult<ExecutionResultDataDefault> = {
    data: {
      register: {
        firstName: 'Inna',
        lastName: 'Losev',
        email: 'i515@ev.de',
        name: 'il',
        role: 'ADMIN'
      }
    }
  };

  t.deepEqual(actual, expected);
});
