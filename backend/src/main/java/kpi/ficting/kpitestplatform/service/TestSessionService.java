package kpi.ficting.kpitestplatform.service;

import java.util.UUID;
import kpi.ficting.kpitestplatform.domain.TestSession;
import kpi.ficting.kpitestplatform.dto.ResponseEntryDto;

public interface TestSessionService {

  TestSession startTestSession(UUID testId, TestSession testSession);

  TestSession saveAnswer(UUID testId, ResponseEntryDto responseEntryDto);

  TestSession finishTestSession(UUID testId);
}
