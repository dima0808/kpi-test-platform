package kpi.ficting.kpitestplatform.service;

import java.util.List;
import kpi.ficting.kpitestplatform.domain.Collection;

public interface CollectionService {

  List<Collection> findAll();

  Collection findById(Long collectionId);

  Collection create(Collection collection);

  void delete(Long collectionId);
}
