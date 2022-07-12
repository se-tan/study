package system.repository;

import static org.junit.jupiter.api.Assertions.*;

import java.util.List;

import javax.validation.ValidationException;

import org.junit.jupiter.api.*;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import system.model.Score;

@SpringBootTest
@Transactional
public class ScoreTest {

    @Autowired
    private DefaultRepository rep;

    Score score;

    @BeforeEach
    public final void setup() {
        score = create("111", "yamada", 70, 55, 55);
        rep.save(score);
        rep.save(create("102", "shimizu", 40, 70, 40));
        rep.save(create("103", "suzuki", 40, 40, 70));
    }

    @Test
    void 成績をIDから取得する() {
        // 正常系 対象あり
        Score actual = Score.load(rep, score.getId());
        assertAll(
                () -> assertEquals("111", actual.getStudentNumber()),
                () -> assertEquals("yamada", actual.getName()),
                () -> assertEquals(70, actual.getMathScore()),
                () -> assertEquals(55, actual.getEnglishScore()),
                () -> assertEquals(55, actual.getPhysicsScore()),
                () -> assertEquals(180, actual.getTotalScore()),
                () -> assertEquals(60, actual.getAverageScore()));

        // 正常系 対象なし
        Throwable e = assertThrows(ValidationException.class, () -> Score.load(rep, 99999L));
        assertEquals("EntityNotFound", e.getMessage());
    }

    @Test
    void 成績を検索する() {
        List<Score> actual = Score.findAll(rep);
        assertEquals(3, actual.size());
        assertEquals("102", actual.get(0).getStudentNumber());
    }

    @Test
    void 成績を氏名で検索する() {
        List<Score> actual = Score.findByName(rep, "zu");
        assertEquals(2, actual.size());
    }

    @ParameterizedTest
    @CsvSource({ "math, 111", "english, 102", "physics, 103", "total, 111" })
    void 成績を検索し教科点数で並び替える(String subject, String firstStudentNumber) {
        List<Score> actual = Score.findAllOrderBySubject(rep, subject);
        assertEquals(3, actual.size());
        assertEquals(firstStudentNumber, actual.get(0).getStudentNumber());
    }

    @Test
    void 成績を登録する() {
        // 事前検証
        List<Score> current = Score.findAll(rep);
        assertEquals(3, current.size());

        // 登録データ
        Score r = create("", "test", 10, 20, 30);

        // 異常系 学籍番号重複
        r.setStudentNumber("111");
        try {
            r.register(rep);
            fail();
        } catch (RuntimeException e) {
            assertEquals("ExistsSameStudentNumber", e.getMessage());
        }

        // 正常系
        r.setStudentNumber("999");
        r = r.register(rep);
        rep.flushAndClear();

        // 事後検証
        current = Score.findAll(rep);
        assertEquals(4, current.size());

        Score actual = Score.load(rep, r.getId());
        assertAll(
                () -> assertEquals("999", actual.getStudentNumber()),
                () -> assertEquals("test", actual.getName()),
                () -> assertEquals(10, actual.getMathScore()),
                () -> assertEquals(20, actual.getEnglishScore()),
                () -> assertEquals(30, actual.getPhysicsScore()),
                () -> assertEquals(60, actual.getTotalScore()),
                () -> assertEquals(20, actual.getAverageScore()));
    }

    @Test
    void 成績を変更する() {
        // 事前検証
        Score current = Score.load(rep, score.getId());
        assertAll(
                () -> assertEquals("111", current.getStudentNumber()),
                () -> assertEquals("yamada", current.getName()),
                () -> assertEquals(70, current.getMathScore()),
                () -> assertEquals(55, current.getEnglishScore()),
                () -> assertEquals(55, current.getPhysicsScore()),
                () -> assertEquals(180, current.getTotalScore()),
                () -> assertEquals(60, current.getAverageScore()));

        // 変更データ
        current.setMathScore(5);
        current.setEnglishScore(10);
        current.setPhysicsScore(15);
        current.calcTotalAndAverage();

        // 正常系
        current.update(rep);
        rep.flushAndClear();

        // 事後検証
        Score actual = Score.load(rep, current.getId());
        assertAll(
                () -> assertEquals(5, actual.getMathScore()),
                () -> assertEquals(10, actual.getEnglishScore()),
                () -> assertEquals(15, actual.getPhysicsScore()),
                () -> assertEquals(30, current.getTotalScore()),
                () -> assertEquals(10, current.getAverageScore()));

    }

    @Test
    void 成績を削除する() {
        // 事前検証
        List<Score> current = Score.findAll(rep);
        assertEquals(3, current.size());

        Score d = Score.load(rep, score.getId());
        assertNotNull(d);

        // 正常系
        d.delete(rep);
        rep.flushAndClear();

        // 事後検証
        current = Score.findAll(rep);
        assertEquals(2, current.size());

        Throwable e = assertThrows(ValidationException.class, () -> Score.load(rep, score.getId()));
        assertEquals("EntityNotFound", e.getMessage());
    }

    public Score create(String studentNumber, String name, int mathScore, int englishScore, int physicsScore) {
        Score s = new Score();
        s.setStudentNumber(studentNumber);
        s.setName(name);
        s.setMathScore(mathScore);
        s.setEnglishScore(englishScore);
        s.setPhysicsScore(physicsScore);
        s.calcTotalAndAverage();
        return s;
    }

}
