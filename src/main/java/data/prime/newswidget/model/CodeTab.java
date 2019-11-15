package data.prime.newswidget.model;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "CODE_TAB")
@Data
public class CodeTab {

    @Column(name = "CODE_DOMAIN")
    private String codeDomain;

    @Column(name = "CODE_NAME")
    private String codeName;

    @Id
    @Column(name = "CODE_ID")
    private Long codeId;

    @Column(name = "CODE_ORDER")
    private Long order;

    @Column(name = "CODE_PARENT_ID")
    private Long parentId;

    @Column(name = "CODE_PARENT_DOMAIN")
    private String parentDomain;

    @Column(name = "CODE_EXTERNAL_ID")
    private String externalId;
}
