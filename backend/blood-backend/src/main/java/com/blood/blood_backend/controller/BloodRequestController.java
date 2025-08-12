package com.blood.blood_backend.controller;

import com.blood.blood_backend.entity.BloodRequest;
import com.blood.blood_backend.service.BloodRequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/requests")
@CrossOrigin(origins = "*")          //frontend ke access ke liye use hota hai
public class BloodRequestController {
    @Autowired
    private BloodRequestService service;
    @GetMapping
    public List<BloodRequest>getAllRequest(){
        return service.getAllRequest();
    }
    @GetMapping("/user/{userId}")
    public List<BloodRequest>getMyRequest(@PathVariable Long userId){
        return service.getRequestByUser(userId);
    }
    @GetMapping("/{id}")
    public BloodRequest getRequestById(@PathVariable Long id){
        return service.getRequestById(id);
    }
    @PostMapping
    public BloodRequest createRequest(@RequestBody BloodRequest req){
        return service.createRequest(req);
    }

    @PutMapping("/{id}")
    public BloodRequest updateRequest(@PathVariable Long id, @RequestBody BloodRequest req) {
        return service.updateRequest(id, req);
    }

    // ✅ Toggle Fulfilled Status
    @PutMapping("/{id}/fulfilled")
    public BloodRequest updateFulfilledStatus(@PathVariable Long id, @RequestParam boolean fulfilled) {
        return service.updateFulfilledStatus(id, fulfilled);
    }


    @DeleteMapping("/{id}")
    public void deleteRequest(@PathVariable Long id) {
        service.deleteRequest(id);
    }

    // ✅ Smart Filter API
    @GetMapping("/search")
    public List<BloodRequest> searchRequests(@RequestParam String bloodGroup, @RequestParam String city) {
        return service.searchRequests(bloodGroup,city);
    }



}
