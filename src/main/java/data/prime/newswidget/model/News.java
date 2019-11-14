package data.prime.newswidget.model;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.util.Date;
import java.util.List;

/**
 * Сущность новости
 *
 * @author konovalovps97 at 09.11.2019
 */
@Entity
@Table(name = "ITEM_TYPE_TAB")
@Data
public class News {

    /**
     * id новости
     */
    @Id
    @Column(name = "ITM_ID")
    private Long id;


    /**
     * id новости
     */
    @Column(name = "ITM_TYPE")
    private String type;

    /**
     * id новости
     */
    @Column(name = "ITM_SUB_TYPE")
    private String subType;

    /**
     * id новости
     */
    @Column(name = "ITM_ALIAS")
    private String alias;


    /**
     * id новости
     */
    @Column(name = "ITM_TITLE_SEARCH")
    private String titleSearch;

    /**
     * id новости
     */
    @Column(name = "ITM_TITLE")
    private String title;

    /**
     * id новости
     */
    @Column(name = "ITM_SUB_TITLE")
    private String subTitle;

    /**
     * id новости
     */
    @Column(name = "ITM_EXTERNAL_ID")
    private Long externalId;

    /**
     * id новости
     */
    @Column(name = "ITM_CREATE_DATE")
    private Date createDate;

    /**
     * id новости
     */
    @Column(name = "ITM_CREATED_BY")
    private String createdBy;

    /**
     * id новости
     */
    @Column(name = "ITM_UPDATE_DATE")
    private Date update;

    /**
     * id новости
     */
    @Column(name = "ITM_UPDATED_BY")
    private String updatedBy;

    /**
     * id новости
     */
    @Column(name = "ITM_PUBLISH_DATE")
    private Date publishDate;

    /**
     * id новости
     */
    @Column(name = "ITM_EXPIRE_DATE")
    private Date expireDate;

    /**
     * id новости
     */
    @Column(name = "ITM_HITS")
    private Long hit;

    /**
     * id новости
     */
    @Column(name = "ITM_COUNT_HITS")
    private Long countHit;

    /**
     * id новости
     */
    @Column(name = "ITM_RATING")
    private Double rating;

    /**
     * id новости
     */
    @Column(name = "ITM_RATING_NUMBER")
    private Long ratingNumber;

    /**
     * id новости
     */
    @Column(name = "ITM_SIGNATURE")
    private String signature;

    /**
     * id новости
     */
    @Column(name = "ITM_STATE")
    private String state;


    /**
     * id новости
     */
    @Column(name = "ITM_STATE_MODIFY_DATE")
    private Date stateUpdate;


}
