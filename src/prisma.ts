import { PrismaClient } from '@prisma/client';
import { pagination } from 'prisma-extension-pagination';

export const prisma = new PrismaClient().$extends(
	pagination({
		cursor: {
			getCursor({ id }) {
				return id;
			},
			parseCursor(cursor) {
				return {
					id: cursor,
				};
			},
		},
	}),
);

export default prisma;
