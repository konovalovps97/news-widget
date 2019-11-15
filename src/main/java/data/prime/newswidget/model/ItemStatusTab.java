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
@Table(name = "ITEM_STATUS_TAB")
@Data
public class ItemStatusTab {

    @Id
    @Column(name = "STS_ITEM_ID")
    private Long id;

    @Column(name = "STS_STATUS")
    private Long status;

    @Column(name = "STS_FROM_DATE")
    private Date dateFrom;

    @Column(name = "STS_TO_DATE")
    private String dateTo;

    @Column(name = "STS_CREATED_BY")
    private Long createdBy;

    @Column(name = "STS_COMMENTS")
    private String comment;

}
