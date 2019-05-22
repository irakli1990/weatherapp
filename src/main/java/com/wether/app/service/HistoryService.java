package com.wether.app.service;


import com.wether.app.domain.History;
import com.wether.app.repository.HistoryRepository;
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
public class HistoryService {


    private final Logger log = LoggerFactory.getLogger(HistoryService.class);

    private final HistoryRepository historyRepository;

    public HistoryService(HistoryRepository historyRepository) {
        this.historyRepository = historyRepository;
    }

    /**
     * @param history the entity to save
     * @return the persisted entity
     * @ Save a history.
     */
    public History save(History history) {
        log.debug("Request to save history : {}", history);
        return historyRepository.save(history);
    }

    /**
     * Get all the history.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<History> findAll(Pageable pageable) {
        log.debug("Request to get all history");
        return historyRepository.findAll(pageable);
    }


    /**
     * Get one history by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public Optional<History> findOne(Long id) {
        log.debug("Request to get history : {}", id);
        return historyRepository.findById(id);
    }

    /**
     * Delete the history by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete history : {}", id);
        historyRepository.deleteById(id);
    }
}
