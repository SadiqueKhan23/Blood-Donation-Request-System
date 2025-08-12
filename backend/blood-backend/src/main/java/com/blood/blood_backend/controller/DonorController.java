package com.blood.blood_backend.controller;


import com.blood.blood_backend.entity.Donor;
import com.blood.blood_backend.service.DonorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/donors")
@CrossOrigin(origins = "*")
public class DonorController {

    @Autowired
    private DonorService service;

    @GetMapping
    public List<Donor> getAllDonors() {
        return service.getAllDonors();
    }
    @GetMapping("/user/{userId}")
    public List<Donor>getMyDonors(@PathVariable Long userId){
        return service.getDonorsByUser(userId);
    }

    @GetMapping("/{id}")
    public Donor getDonorById(@PathVariable Long id) {
        return service.getDonorById(id);
    }

    @PostMapping
    public Donor createDonor(@RequestBody Donor donor) {
        return service.createDonor(donor);
    }



    @PutMapping("/{id}")
    public Donor updateDonor(@PathVariable Long id, @RequestBody Donor donor) {
        return service.updateDonor(id, donor);
    }
    // availablity update krne ke liye
    @PutMapping("/{id}/status")
    public Donor updateAvailability(@PathVariable Long id, @RequestParam boolean available) {
        return service.updateAvailability(id, available);
    }


    @DeleteMapping("/{id}")
    public void deleteDonor(@PathVariable Long id) {
        service.deleteDonor(id);
    }

    //@RequestParam humne isliye use kiya hai kyuki jab hum frontend se input dropdown y filter
    // krke dete hai tab use karte hai aur iska url me thoda alag hota hai
    // like URL: /search?bloodgroup=A+&city=Nagpur
    @GetMapping("/search")
    public List<Donor> searchDonors(@RequestParam String bloodGroup, @RequestParam String city) {
        return service.searchDonors(bloodGroup, city);
    }
    //Note:
    // /search?bloodGroup=O-&city=All it works kyuki url encoding me - sign allow hai lekin
    // /search?bloodGroup=O+&city=All Not Works kyuki + sign ka url me mean hota hai space so
    // humko '+' sign ka encoding use kkarna hai jo hai %2B  example: /search?bloodGroup=O%2B&city=All
    // Aur ye %2B ka use sirf search krne ke liye url me hi use krna hai json se post karte waqt O+ B+ ka sign hi use krna hai

}
