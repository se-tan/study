package system.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import system.model.Score;
import system.repository.DefaultRepository;

/** 成績サービス */
@Service
@Transactional
public class ScoreService {

    /**
     * リポジトリ(コンテナよりオブジェクトを取得)
     */
    @Autowired
    private DefaultRepository rep;

    /**
     * 成績情報を全件取得する。
     * @return 成績リスト
     */
    public List<Score> findScore() {
        return Score.findAll(rep);
    }

    /**
     * 指定した成績IDに紐づく成績データを1件取得する。
     * @param id 取得したい成績ID
     * @return 成績データ
     */
    public Score findScoreById(long id) {
        return Score.load(rep, id);
    }

    /**
     * 指定した氏名で成績情報を検索する。
     * @param nameKeyword 氏名キーワード
     * @return 成績リスト
     */
    public List<Score> findScoreByName(String nameKeyword) {
        return Score.findByName(rep, nameKeyword);
    }

    /**
     * 指定した教科で成績情報を並び替える。
     * @return 成績リスト
     */
    public List<Score> findAllOrderBySubject(String subject) {
        return Score.findAllOrderBySubject(rep, subject);
    }

    /**
     * 指定した成績情報を新規登録する。
     * @param score 登録したい成績データ
     */
    public void registerScore(Score score) {
        score.register(rep);
    }

    /**
     * 指定した成績情報を更新する。
     * @param score 更新したい成績データ
     */
    public void updateScore(Score score) {
        score.update(rep);
    }

    /**
     * 指定した成績情報を削除する。
     * @param score 削除したい成績データ
     */
    public void deleteScore(Score score) {
        score.delete(rep);
    }

}
