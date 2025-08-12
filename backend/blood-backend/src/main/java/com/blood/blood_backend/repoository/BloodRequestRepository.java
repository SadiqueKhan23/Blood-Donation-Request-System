package com.blood.blood_backend.repoository;

import com.blood.blood_backend.entity.BloodRequest;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BloodRequestRepository extends JpaRepository<BloodRequest,Long> {
    //custom finder methods
    List<BloodRequest>findByBloodGroup(String bloodGroup);
    List<BloodRequest>findByCity(String city);
    List<BloodRequest>findByBloodGroupAndCity(String bloodGroup, String city);

    List<BloodRequest>findByUserId(Long userId);
}
