package kpi.ficting.kpitestplatform.config;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker
@RequiredArgsConstructor
@Slf4j
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

  @Value("${kpi-test-platform.web-socket.allowed-origin}")
  private String allowedOrigin;

  @Override
  public void registerStompEndpoints(StompEndpointRegistry registry) {
    registry.addEndpoint("/ws")
        .setAllowedOrigins(allowedOrigin)
        .withSockJS();
    registry.addEndpoint("/ws")
        .setAllowedOrigins(allowedOrigin);
  }

  @Override
  public void configureMessageBroker(MessageBrokerRegistry registry) {
    registry.enableSimpleBroker("/topic", "/user", "/queue");
    registry.setUserDestinationPrefix("/user");
    registry.setApplicationDestinationPrefixes("/api/v1");
  }
}
