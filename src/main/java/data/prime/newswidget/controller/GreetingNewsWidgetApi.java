package data.prime.newswidget.controller;

import data.prime.newswidget.model.News;
import data.prime.newswidget.service.NewsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import java.sql.Date;
import java.util.ArrayList;
import java.util.List;

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
    String greeting(Model model) {
        News news = new News();
        news.setId(1L);
        news.setDate(new Date(1573596823005L));
        news.setFamiliar(false);
        news.setText("ASDASDASD");
        news.setTopic("TEST_TEST");

        news.setSkills("Скил1, Скил2");

        List<News> newsList = new ArrayList<>();
        newsList.add(news);
        newsList.add(news);

        model.addAttribute("newsList", newsList);
        return "index";
    }
}
