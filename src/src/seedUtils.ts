import { DeepPartial, EntityManager, EntityTarget } from 'typeorm';

export function createList<Entity>(manager: EntityManager, entityClass: EntityTarget<Entity>, entityLikeList: DeepPartial<Entity>[]): Promise<Entity[]> {
  const repository = manager.getRepository(entityClass);
  const entityList = repository.create(entityLikeList);
  return repository.save(entityList as DeepPartial<Entity>[], { reload: true });
}
