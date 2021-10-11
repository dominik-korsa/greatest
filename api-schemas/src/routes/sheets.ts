import { Static, Type } from '@sinclair/typebox';
import { sheetSchema, trimmedStringSchema } from '../common';

export const createSheetBodySchema = Type.Object({
  questionVariants: Type.Array(Type.Integer({ minimum: 0 }), {
    minItems: 1,
  }),
  student: Type.Optional(trimmedStringSchema(true)),
});
export type CreateSheetBody = Static<typeof createSheetBodySchema>;
export const createSheetReplySchema = sheetSchema;
export type CreateSheetReply = Static<typeof createSheetReplySchema>;

export const sheetParamsSchema = Type.Object({
  testShortId: Type.String(),
  sheetShortId: Type.String(),
});
export type SheetParams = Static<typeof sheetParamsSchema>;

export const createRandomSheetsBodySchema = Type.Object({
  count: Type.Integer({
    minimum: 0,
  }),
});
export type CreateRandomSheetsBody = Static<typeof createRandomSheetsBodySchema>;
export const createRandomSheetsReplySchema = Type.Object({
  newSheets: Type.Array(sheetSchema),
});
export type CreateRandomSheetsReply = Static<typeof createRandomSheetsReplySchema>;

export const listSheetsReplySchema = Type.Object({
  sheets: Type.Array(sheetSchema),
});
export type ListSheetsReply = Static<typeof listSheetsReplySchema>;

export const getSheetReplySchema = sheetSchema;
export type GetSheetReply = Static<typeof getSheetReplySchema>;
