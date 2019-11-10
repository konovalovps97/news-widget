package data.prime.newswidget.controller;

import data.prime.newswidget.service.NewsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * Контроллер для создания главной страницы придложения
 *
 * @author konovalovps97 at 09.11.2019
 */
@Controller
@RequestMapping(value = "/api/v1/news")
public class GreetingNewsWidgetApi {

    private final NewsService newsService;

    @Autowired
    public GreetingNewsWidgetApi(NewsService newsService) {
        this.newsService = newsService;
    }

    @GetMapping
    String greeting() {
        return "index";
    }
}
