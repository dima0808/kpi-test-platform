package kpi.ficting.kpitestplatform.domain;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
@Entity
public class TestSession {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private String studentGroup;
  private String studentName;

  private Boolean isFinished;

  @OneToMany(mappedBy = "testSession", fetch = FetchType.LAZY, orphanRemoval = true, cascade = CascadeType.ALL)
  private List<ResponseEntry> responses;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(nullable = false)
  private Test test;
}