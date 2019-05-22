package com.wether.app.domain;

import org.springframework.cloud.cloudfoundry.com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;


@Entity
@Table(name = "history")
public class History implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "city")
    private String city;
    @Column(name = "temp")
    private String temp;
    @Column(name = "temp_max")
    private String tempMax;
    @Column(name = "humidity")
    private String humidity;
    @Column(name = "pressure")
    private String pressure;
    @JsonIgnore
    @Column(name = "search_time")
    private Instant searchTime = null;


    public History id(Long id) {
        this.id = id;
        return this;
    }

    public History city(String city) {
        this.city = city;
        return this;
    }

    public History temp(String temp) {
        this.temp = temp;
        return this;
    }

    public History tempMax(String tempMax) {
        this.tempMax = tempMax;
        return this;
    }

    public History humidity(String humidity) {
        this.humidity = humidity;
        return this;
    }

    public History presure(String presure) {
        this.pressure = presure;
        return this;
    }
    public History searchTime(Instant searchTime) {
        this.searchTime = searchTime.now();
        return this;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getTemp() {
        return temp;
    }

    public void setTemp(String temp) {
        this.temp = temp;
    }

    public String getTempMax() {
        return tempMax;
    }

    public void setTempMax(String tempMax) {
        this.tempMax = tempMax;
    }

    public String getHumidity() {
        return humidity;
    }

    public void setHumidity(String humidity) {
        this.humidity = humidity;
    }

    public String getPressure() {
        return pressure;
    }

    public void setPressure(String pressure) {
        this.pressure = pressure;
    }

    public Instant getSearchTime() {
        return searchTime;
    }

    public void setSearchDate(Instant searchTime) {
        this.searchTime = searchTime;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        History history = (History) o;
        if (history.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), history.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getId(), getCity(), getTemp(), getTempMax(), getHumidity(), getPressure());
    }

    @Override
    public String toString() {
        return "History{" +
            "id=" + getId() +
            ", city='" + getCity() + '\'' +
            ", temp='" + getTemp() + '\'' +
            ", tempMax='" + getTempMax() + '\'' +
            ", humidity='" + getHumidity() + '\'' +
            ", pressure='" + getPressure() + '\'' +
            '}';
    }
}
