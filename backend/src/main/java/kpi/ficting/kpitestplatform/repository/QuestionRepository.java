package kpi.ficting.kpitestplatform.repository;

import java.util.List;
import java.util.UUID;
import kpi.ficting.kpitestplatform.domain.Question;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface QuestionRepository extends JpaRepository<Question, Long> {

  List<Question> findByTestId(UUID testId);

  List<Question> findByCollectionId(Long collectionId);
}
