package kpi.ficting.kpitestplatform.web;

import java.util.UUID;
import kpi.ficting.kpitestplatform.dto.ResponseEntryDto;
import kpi.ficting.kpitestplatform.dto.websocket.TestMessage;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class TestSessionController {

  @MessageMapping("/tests/{testId}/start")
  @SendTo({"/topic/tests", "/topic/tests/{testId}"})
  public TestMessage startTestSession(@DestinationVariable UUID testId) {
    return null;
  }

  @MessageMapping("/tests/{testId}/saveAnswer")
  @SendTo("/topic/tests/{testId}")
  public TestMessage saveAnswer(@DestinationVariable UUID testId,
      @Payload ResponseEntryDto responseEntryDto) {
    return null;
  }

  @MessageMapping("/tests/{testId}/finish")
  @SendTo({"/topic/tests", "/topic/tests/{testId}"})
  public TestMessage finishTestSession(@DestinationVariable UUID testId) {
    return null;
  }
}
