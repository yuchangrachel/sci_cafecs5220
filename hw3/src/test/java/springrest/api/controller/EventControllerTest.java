
package springrest.api.controller;


import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


import org.hamcrest.Matchers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.testng.AbstractTransactionalTestNGSpringContextTests;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;
import org.testng.annotations.BeforeClass;
import org.testng.annotations.Test;




@Test
@WebAppConfiguration
@ContextConfiguration(locations = { "classpath:springrest-servlet.xml",
    "classpath:applicationContext.xml" })
class EventControllerTest extends AbstractTransactionalTestNGSpringContextTests {

    @Autowired
    private WebApplicationContext wac;

    
    private MockMvc mockMvc;
   

    @BeforeClass
    void setup()
    {
        this.mockMvc = MockMvcBuilders.webAppContextSetup( wac ).build();
     
    }
    @Test
    void getEvent() throws Exception
    {
        this.mockMvc.perform( get( "/events/1" ) )
            .andExpect( status().isOk() )
            .andExpect( jsonPath( "location" ).value( "EA111" ) );
    }

    @Test
    void getEvents() throws Exception
    {
        this.mockMvc.perform( get( "/events" ) )
            .andExpect( status().isOk() )
            .andExpect( jsonPath( "$[0].id" ).value(1) );
    }

    @Test
    void getEvents2() throws Exception
    {
        this.mockMvc.perform( get( "/events" ) )
            .andExpect( status().isOk() )
            .andExpect( jsonPath( "$.length()" )
                .value( Matchers.greaterThanOrEqualTo( 1 ) ) );
    }

 
    //test addevent case
    @Test
    @Rollback(false)
    void addEvents() throws Exception
    {    
        this.mockMvc.perform( post( "/events" ).contentType( "application/json" )
               .content( "{\"name\":\"apply graduate\", \"location\": \"Eagle building\", \"description\": \"senior student applying master\", \"status\": \"SUBMITTED\"}" ) )
            .andExpect( status().is2xxSuccessful() );
    }
    
    //approve/reject event testcase
    @Test
    @Rollback(false)
    void setStatus() throws Exception
    {
    	this.mockMvc.perform( put( "/events/2/status" ).contentType( "application/json" )
           .content( "{\"status\": \"POSTED\"}" ) )
        .andExpect( status().is2xxSuccessful() );
    }
    
    
    //test add attender(id) to event 
    @Test
    @Rollback(false)
    void addAttendee() throws Exception
    {
    	this.mockMvc.perform( post( "/events/1/attendees").contentType("application/json")
    			.content("{\"id\": 1}"))
    		.andExpect(status().is2xxSuccessful() );
    }
    
    //test get attendees of a event 
    @Test
    void getAllAttendees() throws Exception
    {
        this.mockMvc.perform( get( "/events/1/attendees" ) )
            .andExpect( status().isOk() )
            .andExpect( jsonPath( "$.length()" )
                .value( Matchers.greaterThanOrEqualTo( 2 ) ) );
    }

}

