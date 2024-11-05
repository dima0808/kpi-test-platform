package kpi.ficting.kpitestplatform.repository;

import kpi.ficting.kpitestplatform.domain.TestSession;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TestSessionRepository extends JpaRepository<TestSession, Long> {

  boolean existsByStudentGroupAndStudentName(String studentGroup, String studentName);
}
