import type { CursorPaginationMeta } from 'prisma-extension-pagination';

export interface PaginatedResponse<model> {
	meta: CursorPaginationMeta;
	data: model[];
}
