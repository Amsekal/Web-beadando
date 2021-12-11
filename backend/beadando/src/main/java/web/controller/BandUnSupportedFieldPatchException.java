package web.controller;

public class BandUnSupportedFieldPatchException extends RuntimeException {

    public BandUnSupportedFieldPatchException(String name) {
        super("Field " + name + " update is not allow.");
    }

}
