package system.model;

import java.util.List;

import javax.persistence.*;

import lombok.Data;
import system.anotation.*;
import system.repository.DefaultRepository;

/**
 * 成績を表現します。
 */
@Entity
@Data
public class Score implements Model {
    private static final long serialVersionUID = 1L;

    /** ID */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /** 学籍番号 */
    @StudentNumber
    private String studentNumber;

    /** 氏名 */
    @Name
    private String name;

    /** 数学の点数 */
    @SubjectScore
    private int mathScore = 0;

    /** 英語の点数 */
    @SubjectScore
    private int englishScore = 0;

    /** 物理の点数 */
    @SubjectScore
    private int physicsScore = 0;

    /** 合計点 */
    private int totalScore = 0;

    /** 平均点 */
    private double averageScore = 0;

    /** 個人の合計点、平均点を算出します */
    public void calcTotalAndAverage() {
        // 科目数
        final int SUBJECT_COUNT = 3;
        // 合計点を算出する。
        this.totalScore = mathScore + englishScore + physicsScore;
        // 平均点を算出する。
        this.averageScore = (double) totalScore / SUBJECT_COUNT;
    }

    /** 成績を登録します */
    public Score register(DefaultRepository rep) {
        if (!this.studentNumber.isBlank() && existsSameStudentNumber(rep, this.studentNumber)) {
            throw new RuntimeException("ExistsSameStudentNumber");
        }
        calcTotalAndAverage();
        rep.save(this);
        return this;
    }

    public boolean existsSameStudentNumber(DefaultRepository rep, String studentNumber) {
        List<Score> score = rep.find("FROM Score s WHERE s.studentNumber=?1", studentNumber);
        return !score.isEmpty();
    }

    /** 成績を変更します */
    public Score update(DefaultRepository rep) {
        return this;
    }

    /** 成績を削除します */
    public Score delete(DefaultRepository rep) {
        rep.delete(this);
        return this;
    }

    /** 成績をIDから取得します */
    public static Score load(DefaultRepository rep, Long id) {
        return rep.load(Score.class, id);
    }

    /** 成績を検索します */
    public static List<Score> findAll(DefaultRepository rep) {
        return rep.find("FROM Score s ORDER BY s.studentNumber");
    }

    /** 成績を氏名で検索します */
    public static List<Score> findByName(DefaultRepository rep, String nameKeyword) {
        return null;
    }

    /** 成績を検索し、教科点数で並び替えます */
    public static List<Score> findAllOrderBySubject(DefaultRepository rep, String subject) {
        return null;
    }

}
