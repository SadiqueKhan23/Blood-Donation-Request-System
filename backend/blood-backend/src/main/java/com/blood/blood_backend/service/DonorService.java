package com.blood.blood_backend.service;

import com.blood.blood_backend.entity.Donor;
import com.blood.blood_backend.repoository.DonorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DonorService {

    @Autowired
    private DonorRepository repository;

    public List<Donor> getAllDonors() {
        return repository.findAll();
    }
    public List<Donor> getDonorsByUser(Long userId){
        return repository.findByUserId(userId);
    }
    public Donor getDonorById(Long id) {
        return repository.findById(id).orElse(null);
    }

    public Donor createDonor(Donor donor) {
        return repository.save(donor);
    }

    public Donor updateDonor(Long id, Donor donor) {
        donor.setId(id);
        return repository.save(donor);
    }
    //update only availablity
    public Donor updateAvailability(Long id, boolean available) {
        Donor donor = getDonorById(id); // existing method use karo
        donor.setAvailable(available);
        return repository.save(donor);
    }


    public void deleteDonor(Long id) {
        repository.deleteById(id);
    }

    // 🔍 Smart Filter Logic
    public List<Donor> searchDonors(String bloodGroup, String city) {
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

