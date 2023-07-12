import { Injectable, OnApplicationShutdown } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { INestApplication } from '@nestjs/common';

@Injectable()
export class PrismaService extends PrismaClient implements OnApplicationShutdown {
  constructor() {
    super();
  }

  async onApplicationShutdown(signal?: string) {
    await this.$disconnect();
  }

  async enableShutdownHooks(app: INestApplication) {
    app.enableShutdownHooks();
  }
}
