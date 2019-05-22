package com.wether.app.web.rest;

import com.wether.app.domain.History;
import com.wether.app.service.HistoryService;
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
@RequestMapping("/api/history")
public class HistoryResource {

    private final Logger log = LoggerFactory.getLogger(HistoryResource.class);


    private static final String ENTITY_NAME = "history";

    private final HistoryService historyService;

    public HistoryResource(HistoryService historyService) {
        this.historyService = historyService;
    }


    /**
     * GET getHistory
     *
     * @return history list
     */
    @GetMapping("/get-history")
    public ResponseEntity<List<History>> getAllMinimas(Pageable pageable) {
        log.debug("REST request to get a page of History");
        Page<History> page = historyService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/get-history");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }


    /**
     * POST saveHistory
     *
     * @return new record to database
     */
    @PostMapping("/save-history")
    public ResponseEntity<History> createHistory(@Valid @RequestBody History history) throws URISyntaxException {
        log.debug("REST request to save history : {}", history);
        if (history.getId() != null) {
            throw new BadRequestAlertException("A new history cannot already have an ID", ENTITY_NAME, "id is exists");
        }
        History result = historyService.save(history);
        return ResponseEntity.created(new URI("/save-history" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * DELETE deleteHistory
     *
     * @param id
     */
    @DeleteMapping("/delete-history/{id}")
    public ResponseEntity<Void> deleteHistory(@PathVariable Long id) {
        log.debug("REST request to delete History : {}", id);
        historyService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

}
