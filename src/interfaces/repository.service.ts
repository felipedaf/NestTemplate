export abstract class RepositoryService<T> {
  abstract findById(id: number, repo: string): Promise<T>;

  abstract findByProperty(propertySet: object, repo: string): Promise<T>;

  abstract create(obj: Partial<T>, repo: string): Promise<T>;

  abstract delete(id: string, repo: string): Promise<boolean>;
}
