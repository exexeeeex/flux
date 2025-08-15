import path from 'node:path';
import type { PrismaConfig } from 'prisma';

export default {
    schema: path.join('src/config/database/prisma', 'schema.prisma'),
    migrations: {
        path: path.join('src/config/database/prisma', 'migrations'),
    },
} satisfies PrismaConfig;
