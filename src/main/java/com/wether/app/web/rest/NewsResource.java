package com.wether.app.web.rest;

import com.wether.app.domain.News;
import com.wether.app.service.NewsService;
import com.wether.app.web.rest.errors.BadRequestAlertException;
import com.wether.app.web.rest.util.HeaderUtil;
import com.wether.app.web.rest.util.PaginationUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;


/**
 * @author Irakli Kardava
 */
@RestController
@RequestMapping("/api/news")
public class NewsResource {

    private final Logger log = LoggerFactory.getLogger(NewsResource.class);


    private static final String ENTITY_NAME = "news";

    private final NewsService newsService;

    public NewsResource(NewsService newsService) {
        this.newsService = newsService;
    }


    /**
     * GET news
     *
     * @return news list
     */
    @GetMapping("/get-news")
    public ResponseEntity<List<News>> getAllMinimas(Pageable pageable) {
        log.debug("REST request to get a page of News");
        Page<News> page = newsService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/get-news");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }


    /**
     * POST saveHistory
     *
     * @return new record to database
     */
    @PostMapping("/save-news")
    public ResponseEntity<News> createHistory(@Valid @RequestBody News news) throws URISyntaxException {
        log.debug("REST request to save history : {}", news);
        if (news.getId() != null) {
            throw new BadRequestAlertException("A new history cannot already have an ID", ENTITY_NAME, "id is exists");
        }
        News result = newsService.save(news);
        return ResponseEntity.created(new URI("/save-news" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    @PutMapping("/update_news")
    public ResponseEntity<News> updateHistory(@Valid @RequestBody News news) throws URISyntaxException {
        return createHistory(news);
    }

    /**
     * DELETE deleteHistory
     *
     * @param id
     */
    @DeleteMapping("/delete-news/{id}")
    public ResponseEntity<Void> deleteHistory(@PathVariable Long id) {
        log.debug("REST request to delete news : {}", id);
        newsService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

}
