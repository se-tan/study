package com.example.demo.controller;

import java.security.KeyStore.Entry;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/web")
public class WebController {
  
  @RequestMapping(value = "/entries/latest", method = RequestMethod.GET)
  public Entry getLatestEntry() {
    Entry entryData = new Entry();
    entryData.setTitle("VueRouterを使ってみた");
    entryData.setContent("VueRouterで簡単にページルーティングができました");
    return entryData;
  }

  private class Entry {
    private String title;
    private String content;

    public String getTitle() {
      return title;
    }

    public void setTitle(String title) {
      this.title = title;
    }

    public String getContent() {
      return content;
    }

    public void setContent(String content) {
      this.content = content;
    }
  }
}
