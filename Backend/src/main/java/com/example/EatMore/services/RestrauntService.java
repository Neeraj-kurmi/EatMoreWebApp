package com.example.EatMore.services;

import com.example.EatMore.entity.Item;
import com.example.EatMore.entity.Restraunt;
import com.example.EatMore.repositories.RestrauntsRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.LinkedList;
import java.util.List;

@Slf4j
@Service
public class RestrauntService {

    @Autowired
    RestrauntsRepository restrauntsRepository;

    private final CloudinaryService cloudinaryService;

    public RestrauntService( CloudinaryService cloudinaryService) {
        this.cloudinaryService = cloudinaryService;
    }

    public ResponseEntity<?> addRestro(@RequestBody Restraunt restraunts){
        try {
            if (restraunts.getImage() != null && restraunts.getImage().startsWith("data:image")) {
                String  imageUrl = cloudinaryService.upload(restraunts.getImage());
                restraunts.setImage(imageUrl);
            }
            restraunts.setMenu(new LinkedList<>());
            restrauntsRepository.save(restraunts);
            return ResponseEntity.ok(restraunts);
        } catch (Exception e) {
            log.error("Error while adding restaurent : " );
            return ResponseEntity.internalServerError().body("Error: " + e.getMessage());
        }

    }

    public ResponseEntity<?> addItem(@RequestBody Item item , @RequestParam String id) {

        try{
            Restraunt restraunt = restrauntsRepository.findById(id).orElse(null);

            if (restraunt == null) {
                return ResponseEntity.badRequest().build();
            }
            List<Item> menu = restraunt.getMenu();
            if (item.getImage() != null && item.getImage().startsWith("data:image")) {
                String imageUrl = cloudinaryService.upload(item.getImage());
                item.setImage(imageUrl);
            }
            menu.add(item);
            restraunt.setMenu(menu);
            restrauntsRepository.save(restraunt);
            return ResponseEntity.ok(restraunt.getMenu());
        } catch (Exception e) {
            log.error("Error while adding item into restaurent : " );
            return ResponseEntity.internalServerError().body("Error: " + e.getMessage());
        }

    }

    public ResponseEntity<?> removeRestro(String id){
        try {
             restrauntsRepository.deleteById(id);
             return ResponseEntity.ok("Removed");
        } catch (Exception e) {

            log.error("Error while removing restaurent : " );
            return ResponseEntity.internalServerError().body("Error: " + e.getMessage());
        }
    }

    public ResponseEntity<?> removeItm(String rId ,String iId){
        try{
            Restraunt restraunt = restrauntsRepository.findById(rId).orElse(null);
            List<Item>menu=restraunt.getMenu();
            boolean isRemoved= menu.removeIf(item -> item.getId().equals(iId));
            if (restraunt == null || !isRemoved) {
                throw  new RuntimeException("Item not Found");
            }
            restrauntsRepository.save(restraunt);
            return ResponseEntity.ok("deleted");
        } catch (Exception e) {
            log.error("Error while removing item from restaurent : " );
            return ResponseEntity.internalServerError().body("Error: " + e.getMessage());
        }
    }

    public List<Restraunt> allRestraunts(){
        return restrauntsRepository.findAll();
    }

    public List<Item>  allItems(String rId){
        try {
            Restraunt restraunt=restrauntsRepository.findById(rId).orElse(null);
            return restraunt.getMenu();
        } catch (Exception e) {
            log.error("Error while getting all items of  restaurent : " );
            throw new RuntimeException(e);
        }
    }

}
