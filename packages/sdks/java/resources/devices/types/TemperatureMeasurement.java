/**
 * This file was auto-generated by Fern from our API Definition.
 */

package resources.devices.types;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonSetter;
import com.fasterxml.jackson.annotation.Nulls;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import core.ObjectMappers;
import java.lang.Double;
import java.lang.Object;
import java.lang.Override;
import java.lang.String;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@JsonInclude(JsonInclude.Include.NON_EMPTY)
@JsonDeserialize(
    builder = TemperatureMeasurement.Builder.class
)
public final class TemperatureMeasurement {
  private final Optional<Double> avgCelcius;

  private final Optional<List<Sample>> samplesCelcius;

  private TemperatureMeasurement(Optional<Double> avgCelcius,
      Optional<List<Sample>> samplesCelcius) {
    this.avgCelcius = avgCelcius;
    this.samplesCelcius = samplesCelcius;
  }

  @JsonProperty("avg_celcius")
  public Optional<Double> getAvgCelcius() {
    return avgCelcius;
  }

  @JsonProperty("samples_celcius")
  public Optional<List<Sample>> getSamplesCelcius() {
    return samplesCelcius;
  }

  @Override
  public boolean equals(Object other) {
    if (this == other) return true;
    return other instanceof TemperatureMeasurement && equalTo((TemperatureMeasurement) other);
  }

  private boolean equalTo(TemperatureMeasurement other) {
    return avgCelcius.equals(other.avgCelcius) && samplesCelcius.equals(other.samplesCelcius);
  }

  @Override
  public int hashCode() {
    return Objects.hash(this.avgCelcius, this.samplesCelcius);
  }

  @Override
  public String toString() {
    return ObjectMappers.stringify(this);
  }

  public static Builder builder() {
    return new Builder();
  }

  @JsonIgnoreProperties(
      ignoreUnknown = true
  )
  public static final class Builder {
    private Optional<Double> avgCelcius = Optional.empty();

    private Optional<List<Sample>> samplesCelcius = Optional.empty();

    private Builder() {
    }

    public Builder from(TemperatureMeasurement other) {
      avgCelcius(other.getAvgCelcius());
      samplesCelcius(other.getSamplesCelcius());
      return this;
    }

    @JsonSetter(
        value = "avg_celcius",
        nulls = Nulls.SKIP
    )
    public Builder avgCelcius(Optional<Double> avgCelcius) {
      this.avgCelcius = avgCelcius;
      return this;
    }

    public Builder avgCelcius(Double avgCelcius) {
      this.avgCelcius = Optional.of(avgCelcius);
      return this;
    }

    @JsonSetter(
        value = "samples_celcius",
        nulls = Nulls.SKIP
    )
    public Builder samplesCelcius(Optional<List<Sample>> samplesCelcius) {
      this.samplesCelcius = samplesCelcius;
      return this;
    }

    public Builder samplesCelcius(List<Sample> samplesCelcius) {
      this.samplesCelcius = Optional.of(samplesCelcius);
      return this;
    }

    public TemperatureMeasurement build() {
      return new TemperatureMeasurement(avgCelcius, samplesCelcius);
    }
  }
}