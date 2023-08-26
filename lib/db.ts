import { PrismaClient } from '@prisma/client';

declare global {
	var CachedPrisma: PrismaClient;
}

let prisma: PrismaClient;
if (process.env.NODE_ENV === 'production') {
	prisma = new PrismaClient();
} else {
	if (!global.CachedPrisma) {
		global.CachedPrisma = new PrismaClient();
	}
	prisma = global.CachedPrisma;
}

export const db = prisma;
