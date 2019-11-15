package data.prime.newswidget.controller;

import data.prime.newswidget.model.ItemTypeTab;
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

import java.util.Date;
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
    public List<ItemTypeTab> newsList() {
        List<ItemTypeTab> itemTypeTabList;
        itemTypeTabList = newsRepo.findAllByTypeLike("BREAKINGNEWS");
        List<Date> dates = itemTypeTabList.stream().map(ItemTypeTab::getCreateDate).sorted().collect(Collectors.toList());
        actualDate = dates.get(dates.size() - 1);
        return itemTypeTabList;
    }

    @Scheduled(fixedDelay = 5000, initialDelay = 1000)
    public void handleWebSocketDisconnectListener() {
        List<ItemTypeTab> itemTypeTabList;
        System.out.println("Я тут, но тут пусто");
        if (actualDate != null) {
            itemTypeTabList = newsRepo.findAllByCreateDateAfter(actualDate);
            if (itemTypeTabList != null && !itemTypeTabList.isEmpty()) {
                List<Date> dates = itemTypeTabList.stream().map(ItemTypeTab::getCreateDate).sorted().collect(Collectors.toList());
                actualDate = dates.get(dates.size() - 1);
                messagingTemplate.convertAndSend("/topic/public", itemTypeTabList);
            }
        }
    }
}
