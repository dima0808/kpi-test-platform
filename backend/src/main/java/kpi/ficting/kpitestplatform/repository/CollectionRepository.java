package kpi.ficting.kpitestplatform.repository;

import kpi.ficting.kpitestplatform.domain.Collection;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CollectionRepository extends JpaRepository<Collection, Long> {

  boolean existsByName(String name);
}
