package com.blood.blood_backend.repoository;

import com.blood.blood_backend.entity.Donor;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DonorRepository extends JpaRepository<Donor,Long> {
    //search donor by city and blood grooup

    List<Donor>findByBloodGroup(String bloodGroup);
    List<Donor>findByCity(String city);
    List<Donor>findByBloodGroupAndCity(String bloodGroup, String city);
    List<Donor>findByUserId(Long userId);

}

