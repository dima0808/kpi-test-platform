package kpi.ficting.kpitestplatform.repository;

import java.util.Optional;
import java.util.UUID;
import kpi.ficting.kpitestplatform.domain.TestSession;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TestSessionRepository extends JpaRepository<TestSession, Long> {

  boolean existsByStudentGroupAndStudentName(String studentGroup, String studentName);

  Optional<TestSession> findTestSessionByStudentGroupAndStudentNameAndTestId(
      String studentGroup, String studentName, UUID testId);
}
