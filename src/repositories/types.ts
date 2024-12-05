export type Repository<T> = {
  create(data: T): Promise<T>;
  update(id: string, data: Partial<T>): Promise<T>;
  delete(id: string): Promise<void>;
  find(id: string): Promise<T | null>;
  findAll(): Promise<T[]>;
};
