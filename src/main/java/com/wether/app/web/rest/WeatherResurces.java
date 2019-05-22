package com.wether.app.web.rest;


import com.wether.app.domain.Main;
import com.wether.app.domain.WeatherInfo;
import com.wether.app.service.WeatherInfoService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


/**
 * @author Irakli Kardava
 *
 */
@RestController
@RequestMapping("/api/weather")
public class WeatherResurces {

    private final Logger log = LoggerFactory.getLogger(WeatherInfo.class);

    @Autowired
    WeatherInfoService weatherInfoService;



    /**
     * @author Irakli Kardava
     * @param city for one record
     * @return weatherInfoService main body
     */
    @GetMapping("/{city}")
    public Main getWeather(@PathVariable("city") String city) {
        log.debug("REST request to get Weather : {}", WeatherInfo.class);
        return weatherInfoService.getMain(city);
    }

    /**
     * @author Irakli Kardava
     * @param city for forecast
     * @return weatherInfoService forecast body
     */
    @GetMapping("/forecast/{city}")
    public List getWeatherForecast(@PathVariable("city") String city) {
        log.debug("REST request to get Weather : {}", WeatherInfo.class);
        return weatherInfoService.getWeatherForecast(city);
    }
}
