package kpi.ficting.kpitestplatform.common;

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
