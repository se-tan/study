package system.controller;

import java.io.Serializable;
import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.validation.*;
import org.springframework.web.bind.annotation.*;

import lombok.Data;
import system.model.Score;
import system.service.ScoreService;

/** 成績コントローラ */
@Controller
@RequestMapping("/")
public class ScoreController {

    /**
     * 成績サービス(コンテナよりサービスオブジェクトを取得)
     */
    @Autowired
    ScoreService service;

    /**
     * 一覧画面にアクセスしたとき
     * @param search 名前検索用のキーワード(不使用)
     * @param model 画面に表示するためのビューモデル
     * @return 一覧画面
     */
    @GetMapping({ "/", "/list" })
    public String findScore(NameSearch search, ModelMap model) {
        List<Score> scores = service.findScore();
        model.addAttribute("scores", scores);
        return "list";
    }

    /**
     * 新規登録画面にアクセスした時
     * @param model 画面に表示するためのビューモデル
     * @return 登録画面
     */
    @GetMapping("/new")
    public String newScore(ModelMap model) {
        model.addAttribute("score", new Score());
        return "register";
    }

    /**
     * 新規登録画面にて登録ボタンを押下した時
     * @param score 画面に入力された成績データ
     * @param result 入力検証を行った結果
     * @param model 画面に表示するためのビューモデル
     * @return 成功時: 一覧画面 / エラー時: 登録画面
     */
    @PostMapping("/new")
    public String registerScore(@Valid Score score, BindingResult result, ModelMap model) {
        if (result.hasErrors()) {
            return "register";
        }
        try {
            service.registerScore(score);
        } catch (RuntimeException e) {
            if (e.getMessage().equals("ExistsSameStudentNumber")) {
                FieldError fieldError = new FieldError(result.getObjectName(), "studentNumber", "同じ学籍番号が存在します。");
                result.addError(fieldError);
            }
            return "register";
        }
        return "redirect:/list";
    }

    /**
     * 詳細画面にアクセスした時
     * @param model 画面に表示するためのビューモデル
     * @return 詳細画面
     */
    @GetMapping("/detail-{id}-score")
    public String detailScore(ModelMap model, @PathVariable long id) {
        Score score = service.findScoreById(id);
        model.addAttribute("score", score);
        return "detail";
    }

    /**
     * 編集画面にアクセスした時
     * @param model 画面に表示するためのビューモデル
     * @param id 成績ID
     * @return 編集画面
     */
    @GetMapping("/edit-{id}-score")
    public String editScore(ModelMap model, @PathVariable long id) {
        Score score = service.findScoreById(id);
        model.addAttribute("score", score);
        return "edit";
    }

    /**
     * 編集画面にて編集ボタンを押下した時
     * @param score 画面に入力された成績データ
     * @param result 入力検証を行った結果
     * @param model 画面に表示するためのビューモデル
     * @param id 成績ID
     * @return 成功時: 一覧画面 / エラー時: 編集画面
     */
    @PostMapping("/edit-{id}-score")
    public String updateScore(@Valid Score score, BindingResult result, ModelMap model, @PathVariable long id) {
        if (result.hasErrors()) {
            return "edit";
        }
        service.updateScore(score);
        return "redirect:/list";
    }

    /**
     * 成績情報を削除する
     * @param id 削除対象の成績ID
     * @return 一覧画面
     */
    @GetMapping("/delete-{id}-score")
    public String deleteScore(@PathVariable long id) {
        Score score = service.findScoreById(id);
        service.deleteScore(score);
        return "redirect:/list";
    }

    /**
     * 氏名を用いて成績情報を検索する
     * @param search 名前検索用のキーワード
     * @param model 画面に表示するためのビューモデル
     * @return 一覧画面
     */
    @GetMapping("/search")
    public String searchByName(NameSearch search, ModelMap model) {
        List<Score> scores = service.findScoreByName(search.getNameKeyword());
        model.addAttribute("scores", scores);
        return "list";
    }

    @Data
    public static class NameSearch implements Serializable {
        private static final long serialVersionUID = 1L;
        private String nameKeyword;
    }

    /**
     * 成績情報を並び変える
     * @param subject 並び替え対象
     * @param search 名前検索用のキーワード(不使用)
     * @param model 画面に表示するためのビューモデル
     * @return 一覧画面
     */
    @GetMapping("/search/order-{subject}")
    public String orderBySubject(@PathVariable String subject, NameSearch search, ModelMap model) {
        List<Score> scores = service.findAllOrderBySubject(subject);
        model.addAttribute("scores", scores);
        return "list";
    }

}
