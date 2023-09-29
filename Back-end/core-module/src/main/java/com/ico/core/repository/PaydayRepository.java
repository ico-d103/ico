package com.ico.core.repository;

import com.ico.core.entity.Payday;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

/**
 * 월급일자 Repository
 *
 * @author 변윤경
 */
public interface PaydayRepository extends JpaRepository<Payday, Long> {
    List<Payday> findAllByNationIdOrderByDate(Long nationId);

    Optional<Payday> findByNationIdAndDate(Long nationId, Byte date);

    // 국가의 월급일이 오늘인 나라의 id 추출
    @Query("SELECT e.nation.id FROM Payday e WHERE e.date = :date")
    List<Long> findNationIdsByDateEqualsOne(@Param("date") byte date);

    // 오늘이 달의 마지막 날일때 오늘 이후의 날짜를 월급일로 가진 국가의 id까지 추출
    @Query("SELECT e.nation.id FROM Payday e WHERE e.date in :dates")
    List<Long> findNationIdsByDateIsIn(List<Byte> dates);


}
