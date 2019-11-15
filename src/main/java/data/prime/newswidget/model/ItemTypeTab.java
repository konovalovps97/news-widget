package data.prime.newswidget.model;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.util.Date;

/**
 * Сущность новости
 *
 * @author konovalovps97 at 09.11.2019
 */
@Entity
@Table(name = "ITEM_TYPE_TAB")
@Data
public class ItemTypeTab {

    @Id
    @Column(name = "ITM_ID")
    private Long id;

    @Column(name = "ITM_TYPE")
    private String type;

    @Column(name = "ITM_SUB_TYPE")
    private String subType;

    @Column(name = "ITM_ALIAS")
    private String alias;

    @Column(name = "ITM_TITLE_SEARCH")
    private String titleSearch;

    @Column(name = "ITM_TITLE")
    private String title;

    @Column(name = "ITM_SUB_TITLE")
    private String subTitle;

    @Column(name = "ITM_EXTERNAL_ID")
    private Long externalId;

    @Column(name = "ITM_CREATE_DATE")
    private Date createDate;

    @Column(name = "ITM_CREATED_BY")
    private String createdBy;

    @Column(name = "ITM_UPDATE_DATE")
    private Date update;

    @Column(name = "ITM_UPDATED_BY")
    private String updatedBy;

    @Column(name = "ITM_PUBLISH_DATE")
    private Date publishDate;

    @Column(name = "ITM_EXPIRE_DATE")
    private Date expireDate;

    @Column(name = "ITM_HITS")
    private Long hit;

    @Column(name = "ITM_COUNT_HITS")
    private Long countHit;


    @Column(name = "ITM_RATING")
    private Double rating;

    @Column(name = "ITM_RATING_NUMBER")
    private Long ratingNumber;


    @Column(name = "ITM_SIGNATURE")
    private String signature;


    @Column(name = "ITM_STATE")
    private String state;


    @Column(name = "ITM_STATE_MODIFY_DATE")
    private Date stateUpdate;


    @Column(name = "ITM_STATE_MODIFY_BY")
    private Long stateUpdateBy;



    @Column(name = "ITM_SHOW_SEARCH_RESULT")
    private Long resultSearch;

    @Column(name = "ITM_REVISION")
    private Long itemRevision;


    @Column(name = "ITM_RANK")
    private Long itemRank;

    @Column(name = "ITM_SYS_UPDATE_DATE")
    private Date updateDAte;

}
