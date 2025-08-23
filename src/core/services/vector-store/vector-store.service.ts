import { Injectable } from '@nestjs/common';
import {
  PGVectorStore,
  PGVectorStoreArgs
} from '@langchain/community/vectorstores/pgvector';
import { OpenAIEmbeddings } from '@langchain/openai';
import { Document } from '@langchain/core/documents';

@Injectable()
export class VectorStoreService {
  private vectorStore: PGVectorStore;

  constructor() {
    this.initialize();
  }

  private async initialize() {
    const embedding = new OpenAIEmbeddings({
      apiKey: process.env.OPENAI_API_KEY,
      model: 'text-embedding-3-small',
    });

    const config: PGVectorStoreArgs = {
      postgresConnectionOptions: {
        type: 'postgres',
        host: process.env.DATABASE_HOST,
        port: process.env.DATABASE_PORT,
        user: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
      },
      tableName: 'candidates_documents',
      columns: {
        idColumnName: 'id',
        vectorColumnName: 'vector',
        contentColumnName: 'content',
        metadataColumnName: 'metadata',
      }
    };

    this.vectorStore = await PGVectorStore.initialize(embedding, config);
    console.log('Vector store initialized');
  }

  public async addDocuments(documents: Document[]) {
    await this.vectorStore.addDocuments(documents);
  }

  public async deleteDocuments(ids: string[]) {
    await this.vectorStore.delete({
        ids
    });
  }

  public async search(query: string, k: number) {
    const results = await this.vectorStore.similaritySearch(query, k);

    return results;
  }
}
