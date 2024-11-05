package kpi.ficting.kpitestplatform.dto.websocket;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@AllArgsConstructor
@Data
@Builder
public class TestMessage {

  private TestMessageType type;
  private String content;
}
