package com.blood.blood_backend.service;


import com.blood.blood_backend.entity.BloodRequest;
import com.blood.blood_backend.repoository.BloodRequestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BloodRequestService {
    @Autowired
    private BloodRequestRepository repository;
    public List<BloodRequest> getAllRequest(){ //for show all request
        return repository.findAll();
    }
    public List<BloodRequest>getRequestByUser(Long userId){
        return repository.findByUserId(userId);
    }
    public BloodRequest getRequestById(Long id){   //for show request by id
        return repository.findById(id).orElse(null);
    }
    public BloodRequest createRequest(BloodRequest req){ //for making blood request
        return repository.save(req);
    }
    public BloodRequest updateRequest(Long id, BloodRequest req){ //for update request
        req.setId(id);
        return repository.save(req);
    }

    public BloodRequest updateFulfilledStatus(Long id, boolean fulfilled) {
        BloodRequest req = getRequestById(id);
        req.setFulfilled(fulfilled);
        return repository.save(req);
    }


    public void deleteRequest(Long id){   //for delete req
        repository.deleteById(id);
    }

    // ✅ Smart Search Logic
    public List<BloodRequest> searchRequests(String bloodGroup, String city) {
        boolean isGroupAll = bloodGroup.equalsIgnoreCase("All");
        boolean isCityAll = city.equalsIgnoreCase("All");

        if (isGroupAll && isCityAll) {
            return repository.findAll();
        } else if (isGroupAll) {
            return repository.findByCity(city);
        } else if (isCityAll) {
            return repository.findByBloodGroup(bloodGroup);
        } else {
            return repository.findByBloodGroupAndCity(bloodGroup, city);
        }
    }

}

