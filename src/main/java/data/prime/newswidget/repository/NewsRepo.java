package data.prime.newswidget.repository;

import data.prime.newswidget.model.News;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Репозиторий управления с данными таблицы новостей
 * @author konovalovps97 at 09.11.2019
 */
@Repository
public interface NewsRepo extends JpaRepository<News, String> {
}
