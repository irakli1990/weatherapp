package com.wether.app.service;


import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.wether.app.domain.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;


import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.Reader;
import java.net.*;
import java.nio.charset.StandardCharsets;
import java.util.List;


@Component
public class WeatherInfoService {


    // GSON
    @Autowired
    public static Gson create() {
        return new GsonBuilder().setPrettyPrinting().create();
    }


    // URL AND APLICATION KEY
    private static final String STATIC_WEATHER_URL =
        "http://api.openweathermap.org/data/2.5/weather?q=%s&appid=e7b429593963ceb11a198af8d22c9a55&units=metric";

    private static final String STATIC_WEATHER_FORECAST_URL =
        "http://api.openweathermap.org/data/2.5/forecast?q=%s&appid=e7b429593963ceb11a198af8d22c9a55&units=metric";


    // METHOD FINDING ALL INFORMATION FROM OPENWEATHERMAP
    public WeatherInfo getWeather(String city) {
        Reader reader =
            parsUrltoJsonObject(String.format(STATIC_WEATHER_URL, city));
        WeatherInfo weatherInfo = create().fromJson(reader, WeatherInfo.class);

        return weatherInfo;
    }


    // METHOD FOR WEATHER FORECAST
    public List getWeatherForecast(String city) {
        Reader reader =
            parsUrltoJsonObject(String.format(STATIC_WEATHER_FORECAST_URL, city));
        Forecast listWeatherInfo = create().fromJson(reader, Forecast.class);

        return listWeatherInfo.getList();
    }

    // METHOD FINDING MAIN FROM OPENWEATHER MAP
    public Main getMain(String city) {
        Main main = getWeather(city).getMain();
        return main;
    }


    // METHOD READING READING STREAM FROM URL
    public Reader parsUrltoJsonObject(String url) {
        InputStream inputStream;
        Reader reader = null;
        try {
            inputStream = new URL(url).openStream();
            reader = new InputStreamReader(inputStream, StandardCharsets.UTF_8);
        } catch (MalformedURLException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return reader;
    }

}
