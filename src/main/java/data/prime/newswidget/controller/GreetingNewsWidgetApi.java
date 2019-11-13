package data.prime.newswidget.controller;

import data.prime.newswidget.model.News;
import data.prime.newswidget.repository.NewsRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.sql.Date;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Контроллер для создания главной страницы придложения
 *
 * @author konovalovps97 at 09.11.2019
 */
@Controller
@RequestMapping(value = "/api/v1/news")
public class GreetingNewsWidgetApi {


    private final NewsRepo newsRepo;

    private final SimpMessageSendingOperations messagingTemplate;

    private static Date actualDate;


    @Autowired
    public GreetingNewsWidgetApi(NewsRepo newsRepo, SimpMessageSendingOperations messagingTemplate) {
        this.messagingTemplate = messagingTemplate;
        this.newsRepo = newsRepo;
    }

    @GetMapping
    String greeting(Model model) {
        return "index";
    }

    @MessageMapping("/chat.addUser")
    @SendTo("/topic/public")
    public List<News> newsList() {
        List<News> newsList;
        System.out.println("я контроллер!");
        newsList = newsRepo.findAll();
        List<Date> dates = newsList.stream().map(News::getDate).sorted().collect(Collectors.toList());
        actualDate = dates.get(dates.size() - 1);
        return newsList;
    }

    @Scheduled(fixedDelay = 5000, initialDelay = 1000)
    public void handleWebSocketDisconnectListener() {
        List<News> newsList;
        System.out.println("Я тут, но тут пусто");
        if (actualDate != null) {
            newsList = newsRepo.findAllByDateAfter(actualDate);
            if (newsList != null && !newsList.isEmpty()) {
                List<Date> dates = newsList.stream().map(News::getDate).sorted().collect(Collectors.toList());
                actualDate = dates.get(dates.size() - 1);
                messagingTemplate.convertAndSend("/topic/public", newsList);
            }
        }
    }
}
