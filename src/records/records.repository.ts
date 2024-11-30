import type { Prisma } from '@prisma/client';
import prisma from '../prisma';

interface PaginationCursor {
	after?: string;
	before?: string;
}

export async function getAllRecords(
	where?: Prisma.RecordWhereUniqueInput,
	limit = 10,
	cursor?: PaginationCursor,
) {
	const [data, meta] = await prisma.record.paginate({ where }).withCursor({
		limit,
		after: cursor?.after,
		before: cursor?.before,
	});

	return {
		data,
		meta,
	};
}

export async function getSingleRecord(where: Prisma.RecordWhereUniqueInput) {
	return prisma.record.findUnique({
		where,
	});
}

export async function createRecord(data: Prisma.RecordCreateInput) {
	return prisma.record.create({
		data,
	});
}

export async function updateRecord(
	where: Prisma.RecordWhereUniqueInput,
	data: Prisma.RecordUpdateInput,
) {
	return prisma.record.update({
		where,
		data,
	});
}

export async function deleteRecord(where: Prisma.RecordWhereUniqueInput) {
	return prisma.record.delete({
		where,
	});
}
