package com.wether.app.web.rest;


import com.wether.app.domain.Main;
import com.wether.app.domain.Weather;
import com.wether.app.domain.WeatherInfo;
import com.wether.app.service.WeatherInfoService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/weather")
public class WeatherResurces {

    private final Logger log = LoggerFactory.getLogger(WeatherInfo.class);

    @Autowired
    WeatherInfoService weatherInfoService;

    @GetMapping("/{city}")
    public Main getWeather(@PathVariable("city") String city) {
        log.debug("REST request to get Weather : {}", WeatherInfo.class);
        return weatherInfoService.getMain(city);
    }
    @GetMapping("/forecast/{city}")
    public List getWeatherForecast(@PathVariable("city") String city) {
        log.debug("REST request to get Weather : {}", WeatherInfo.class);
        return weatherInfoService.getWeatherForecast(city);
    }
}
