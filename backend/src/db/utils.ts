import { Moderator } from '../../../db';
import { query } from './index';

export const updateTableRow = async <T>(
  table: string,
  id: number,
  allowedUpdates: string[],
  updatesObj: T,
): Promise<T> => {
  if (allowedUpdates.length < 1) {
    throw new Error('No updates allowed');
  }
  const updateFields = Object.keys(updatesObj as Record<string, unknown>);
  const validUpdate = updateFields.every((updateField) =>
    allowedUpdates.includes(updateField),
  );
  if (!validUpdate) {
    const fieldsString =
      allowedUpdates.length > 1
        ? allowedUpdates.slice(0, allowedUpdates.length - 1).join(', ') +
          ` and ${allowedUpdates[allowedUpdates.length - 1]}`
        : allowedUpdates[0];
    throw new Error(
      `Only the ${fieldsString} ${
        allowedUpdates.length === 1 ? 'field' : 'fields'
      } can be updated`,
    );
  }

  const setFieldsClause = updateFields
    .map((updateField, index) => `${updateField} = $${index + 1}`)
    .join(', ');

  const updateFieldsParams: unknown[] = [];
  updateFields.forEach((updateField) => {
    updateFieldsParams.push(
      (updatesObj as Record<string, unknown>)[updateField],
    );
  });

  const updateTableStatement = `
  update ${table}
  set ${setFieldsClause}
  where id = $${updateFields.length + 1}
  returning *
`;

  const [updatedRow] = await query<T>(updateTableStatement, [
    ...updateFieldsParams,
    id,
  ]);

  return updatedRow;
};

export const selectModeratorsStatement = `
  select u.username moderator_name, sr.name subforum_name
  from moderators m
  inner join users u on m.user_id = u.id
  inner join subforums sr on m.subforum_id = sr.id
`;

export const userIsModerator = async (username: string, subForum: string) => {
  const findSubForumModeratorQuery = `
  ${selectModeratorsStatement}
  where u.username = $1 and sr.name = $2
`;
  const [moderator] = await query<Moderator>(findSubForumModeratorQuery, [
    username,
    subForum,
  ]);

  return !!moderator;
};
