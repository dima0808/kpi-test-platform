package com.nikitin.kpitestplatform.service.impl;

import com.nikitin.kpitestplatform.dto.LoginDto;
import com.nikitin.kpitestplatform.service.AuthService;
import com.nikitin.kpitestplatform.util.JwtUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

  private final JwtUtils jwtUtils;
  private final AuthenticationManager authenticationManager;

  @Override
  public String login(LoginDto loginDto) {
    Authentication authentication = authenticationManager.authenticate(
        new UsernamePasswordAuthenticationToken(loginDto.getUsername(), loginDto.getPassword()));

    return jwtUtils.generateToken(authentication);
  }
}
