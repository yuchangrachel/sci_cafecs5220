package springrest.api.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import springrest.api.error.RestException;
import springrest.model.Program;
import springrest.model.dao.ProgramDao;

@RestController
public class ProgramController {

	@Autowired
	private ProgramDao programDao;

	// get a program by id
	@RequestMapping(value = "/programs/{id}", method = RequestMethod.GET)
	public Program getProgram(@PathVariable Long id) {
		Program program = programDao.getProgram(id);
		if (program == null)
			throw new RestException(404, "No such program.");

		return program;
	}

	// get all programs
	@RequestMapping(value = "/programs", method = RequestMethod.GET)
	public List<Program> getPrograms() {
		return programDao.getAllPrograms();
	}

	// create a new program
	@RequestMapping(value = "/programs", method = RequestMethod.POST)
	public Program addProgram(@RequestBody Program program) {
		try {
			return programDao.saveProgram(program);
		} catch (Exception e) {
			throw new RestException(400, "Missing information of program.");
		}
	}

	// edit program
	@RequestMapping(value = "/programs/{id}/edit", method = RequestMethod.PUT)
	public Program editProgram(@PathVariable Long id, @RequestBody Program program) {
		Program edit = programDao.getProgram(id);
		if (edit == null)
			throw new RestException(404, "Program not found.");
		
		try {			
			edit.setName(program.getName());
			edit.setFullname(program.getFullname());
			edit.setDescription(program.getDescription());

			return programDao.saveProgram(edit);
		} catch (Exception k) {
			throw new RestException(400, "invalid id or Missing information of program that edited");
		}

	}

	// delete a program
	@RequestMapping(value = "/programs/{id}/delete", method = RequestMethod.DELETE)
	public void deleteProgram(@PathVariable Long id) {
		Program delete = programDao.getProgram(id);
		if (delete == null)
			throw new RestException(404, "No program can be deleted.");
		try {
			programDao.deleteProgram(id);
		} catch (Exception o) {
			System.out.println(o);
		}
	

	}

}