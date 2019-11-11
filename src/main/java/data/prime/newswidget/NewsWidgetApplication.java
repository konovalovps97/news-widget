package data.prime.newswidget;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class NewsWidgetApplication {

    public static void main(String[] args) {
        SpringApplication.run(NewsWidgetApplication.class, args);
    }

}
