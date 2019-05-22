package com.wether.app.service;


import com.wether.app.domain.History;
import com.wether.app.domain.News;
import com.wether.app.repository.HistoryRepository;
import com.wether.app.repository.NewsRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;


/**
 * @Author Irakli Kardava
 */
@Service
public class NewsService {


    private final Logger log = LoggerFactory.getLogger(NewsService.class);

    private final NewsRepository newsRepository;

    public NewsService(NewsRepository newsRepository) {
        this.newsRepository = newsRepository;
    }

    /**
     * @param news the entity to save
     * @return the persisted entity
     * @ Save a news.
     */
    public News save(News news) {
        log.debug("Request to save news : {}", news);
        return newsRepository.save(news);
    }

    /**
     * Get all the news
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<News> findAll(Pageable pageable) {
        log.debug("Request to get all News");
        return newsRepository.findAll(pageable);
    }


    /**
     * Get one news by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public Optional<News> findOne(Long id) {
        log.debug("Request to get news : {}", id);
        return newsRepository.findById(id);
    }

    /**
     * Delete the news by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete news : {}", id);
        newsRepository.deleteById(id);
    }
}
