package springrest.model.dao;

import java.util.List;

import springrest.model.Program;

public interface ProgramDao {

    Program getProgram( Long id );

    List<Program> getAllPrograms();

    Program saveProgram( Program program );
    
    void deleteProgram( Long id);
    
}