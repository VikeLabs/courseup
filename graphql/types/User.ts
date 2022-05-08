// /graphql/types/User.ts
import { enumType, extendType, objectType } from 'nexus';

export const User = objectType({
  name: 'User',
  definition(t) {
    t.string('id');
    t.string('name');
    t.string('email');
    t.string('image');
    t.field('role', { type: Role });
  },
});

const Role = enumType({
  name: 'Role',
  members: ['USER', 'ADMIN'],
});

export const UsersQuery = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.list.field('users', {
      type: 'User',
      resolve(_parent, _args, ctx) {
        // mock data for now
        return [
          {
            id: '1',
          },
        ];
      },
    });
  },
});
