package data.prime.newswidget.repository;

import data.prime.newswidget.model.ItemTypeTab;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

/**
 * Репозиторий управления с данными таблицы новостей
 *
 * @author konovalovps97 at 09.11.2019
 */
@Repository
public interface NewsRepo extends JpaRepository<ItemTypeTab, String> {
    List<ItemTypeTab> findAllByTypeLike(String type);

    List<ItemTypeTab> findAllByCreateDateAfter(Date date);
}
