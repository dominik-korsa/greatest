import { FastifyRequest } from 'fastify';
import Busboy from 'busboy';
import { IncomingMessage } from 'http';

export function requireEnv(name: string): string {
  const value = process.env[name];
  if (value === undefined) throw new Error(`Env variable "${name}" not set`);
  return value;
}

export interface File {
  filename: string;
  data: Buffer;
  mimeType: string;
}

export interface MultipartBody {
  files: Partial<Record<string, File>>;
  fields: Partial<Record<string, unknown>>;
}

export function streamToBuffer(stream: NodeJS.ReadableStream): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const chunks: Array<any> = [];
    stream.on('data', (chunk) => {
      chunks.push(chunk);
    });
    stream.on('error', (error) => {
      reject(error);
    });
    stream.on('end', () => {
      resolve(Buffer.concat(chunks));
    });
  });
}

export function parseMultipart(
  request: FastifyRequest,
  payload: IncomingMessage,
): Promise<MultipartBody> {
  return new Promise<MultipartBody>((resolve) => {
    const busboy = new Busboy({
      headers: request.headers,
    });
    const files: Record<string, File> = {};
    const fields: Record<string, unknown> = {};
    busboy.on('file', async (fieldName, stream, filename, encoding, mimeType) => {
      files[fieldName] = {
        data: await streamToBuffer(stream),
        filename,
        mimeType,
      };
    });
    busboy.on('field', (fieldName, value: unknown) => {
      fields[fieldName] = value;
    });
    busboy.on('finish', () => {
      resolve({
        files,
        fields,
      });
    });
    payload.pipe(busboy);
  });
}

export function promiseCache<K, T>(handler: (key: K) => Promise<T>) {
  const map = new Map<K, Promise<T>>();
  return (key: K) => {
    let promise = map.get(key);
    if (promise === undefined) {
      promise = handler(key);
      map.set(key, promise);
    }
    return promise;
  };
}

export function mapTimes<T>(fn: (index: number) => T, count: number): T[] {
  const result: T[] = [];
  for (let i = 0; i < count; i += 1) result.push(fn(i));
  return result;
}

export function randomInt(to: number): number;
export function randomInt(from: number, to: number): number;
export function randomInt(from: number, to?: number): number {
  if (to === undefined) return randomInt(0, from);
  return Math.floor(Math.random() * (to - from)) + from;
}
