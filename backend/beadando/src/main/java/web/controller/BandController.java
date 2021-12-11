package web.controller;

import web.model.Band;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.neo4j.Neo4jAutoConfiguration;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import web.repo.BandRepository;

import java.util.List;

@RestController
@RequestMapping("api/")
@CrossOrigin(origins = "http://localhost:4200")
public class BandController {

    @Autowired
    private BandRepository bandRepository;


    @GetMapping("band")
    public List<Band> getBand(){
        return bandRepository.findAll();
    }

    @PostMapping("/band")
    @ResponseStatus(HttpStatus.CREATED)
    Band newBand(@RequestBody Band newBand) {
        return bandRepository.save(newBand);
    }


    @GetMapping("/band/{id}")
    Band findOne(@PathVariable Long id) throws Exception {
        System.out.println("GET CALLED");
        return bandRepository.findById(id)
                .orElseThrow(() -> new BandNotFoundException(id));
    }


    @PutMapping("/band/{id}")
    Band saveOrUpdate(@RequestBody Band newBand, @PathVariable Long id) {
        System.out.println("PUT CALLED");
        return bandRepository.findById(id)
                .map(x -> {
                    x.setName(newBand.getName());
                    x.setGenre(newBand.getGenre());
                    x.setMember(newBand.getMember());
                    x.setYear(newBand.getYear());

                    return bandRepository.save(x);
                })
                .orElseGet(() -> {
                    newBand.setId(id);
                    return bandRepository.save(newBand);
                });
    }


    @PatchMapping("/band/{id}")
    Band patch(@RequestBody String updatedName, @PathVariable Long id) {
        System.out.println("PATCH CALLED");
        return bandRepository.findById(id)
                .map(x -> {
                    String name = updatedName;
                    if (!name.isEmpty()) {
                        x.setName(name);

                        return bandRepository.save(x);
                    } else {
                        throw new BandUnSupportedFieldPatchException(name);
                    }

                })
                .orElseGet(() -> {
                    throw new BandNotFoundException(id);
                });

    }


    @DeleteMapping("/band/{id}")
    void deleteBand(@PathVariable Long id) {
        System.out.println("DELETE CALLED");
        if(!bandRepository.findById(id).isPresent()) {
            throw new BandNotFoundException(id);
        }
        else {
            bandRepository.deleteById(id);
        }
    }

}
