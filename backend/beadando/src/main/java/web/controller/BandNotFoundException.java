package web.controller;

public class BandNotFoundException extends RuntimeException {

    public BandNotFoundException(Long id) {
        super("ID not found : " + id);
    }

}
