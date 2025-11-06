package com.example.EatMore.controllers;

import com.example.EatMore.entity.Item;
import com.example.EatMore.entity.Restraunt;
import com.example.EatMore.services.RestrauntService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("admin")
public class AdminController {

    private final RestrauntService restrauntService;

   public AdminController(RestrauntService restrauntService){
        this.restrauntService=restrauntService;
    }

    @GetMapping("/allrestraunt")
    public ResponseEntity<List<Restraunt>> getAllRestraunts(){
       return ResponseEntity.ok(restrauntService.allRestraunts());
    }

    @GetMapping("/allItems/{rId}")
    public ResponseEntity<List<Item>> getMenu(@PathVariable String rId){
       return ResponseEntity.ok(restrauntService.allItems(rId));
    }

    @PostMapping("/addrestraunt")
    public ResponseEntity<?> addRestraunt(@RequestBody Restraunt restraunt){
        return  restrauntService.addRestro(restraunt);
    }

    @PostMapping("/addItem/{itemId}")
    public ResponseEntity<?> addItem(@RequestBody Item item , @PathVariable String itemId){
       return restrauntService.addItem(item,itemId);
    }

    @DeleteMapping("/removeRest/{rId}")
    public ResponseEntity removeRestraunt(@PathVariable String rId){
       return restrauntService.removeRestro(rId);
    }

    @DeleteMapping("/removeitem/{rId}/{iId}")
    public ResponseEntity<?> removeItem(@PathVariable String rId,@PathVariable String iId){
        return restrauntService.removeItm(rId,iId);
    }



}
