import { Static, Type } from '@sinclair/typebox';
import { nullable } from '../utility';

export const studentQuerySchema = Type.Object({
  phrase: Type.String(),
});
export type StudentQuery = Static<typeof studentQuerySchema>;
export const checkStudentReplySchema = Type.Object({
  found: Type.Boolean(),
});
export type CheckStudentReply = Static<typeof checkStudentReplySchema>;

export const getStudentSheetReplySchema = Type.Object({
  testName: Type.String(),
  questions: Type.Array(Type.Object({
    points: nullable(Type.Integer()),
    maxPoints: Type.Integer(),
  })),
});
export type GetStudentSheetReply = Static<typeof getStudentSheetReplySchema>;
