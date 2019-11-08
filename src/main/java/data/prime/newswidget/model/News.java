package data.prime.newswidget.model;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.sql.Date;

/**
 * Сущность новости
 *
 * @author konovalovps97 at 09.11.2019
 */
@Entity
@Table(name = "NEWS")
@Data
public class News {

    /**
     * id новости
     */
    @Id
    @Column(name = "ID_NEWS")
    private Long id;

    /**
     * текст новости
     */
    @Column(name = "DATE_NEWS")
    private Date date;

    /**
     * текст новости
     */
    @Column(name = "TEXT_NEWS")
    private String text;

    /**
     * идентификатор ознакмления
     */
    @Column(name = "IS_FAMILIAR")
    private boolean isFamiliar;

    /**
     * тема новости
     */
    @Column(name = "TOPIC_NEWS")
    private String topic;
}
