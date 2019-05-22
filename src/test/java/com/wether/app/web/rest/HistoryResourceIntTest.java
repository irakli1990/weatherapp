package com.wether.app.web.rest;

import com.wether.app.WetherappApp;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
/**
 * Test class for the HistoryResource REST controller.
 *
 * @see HistoryResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = WetherappApp.class)
public class HistoryResourceIntTest {

    private MockMvc restMockMvc;

    @Before
    public void setUp() {
        MockitoAnnotations.initMocks(this);

        HistoryResource historyResource = new HistoryResource();
        restMockMvc = MockMvcBuilders
            .standaloneSetup(historyResource)
            .build();
    }

    /**
     * Test getHistory
     */
    @Test
    public void testGetHistory() throws Exception {
        restMockMvc.perform(get("/api/history/get-history"))
            .andExpect(status().isOk());
    }

    /**
     * Test saveHistory
     */
    @Test
    public void testSaveHistory() throws Exception {
        restMockMvc.perform(post("/api/history/save-history"))
            .andExpect(status().isOk());
    }

    /**
     * Test deleteHistory
     */
    @Test
    public void testDeleteHistory() throws Exception {
        restMockMvc.perform(delete("/api/history/delete-history"))
            .andExpect(status().isOk());
    }
}
