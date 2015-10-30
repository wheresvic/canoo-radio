package com.canoo.radio.server.voting;

import org.springframework.data.repository.CrudRepository;

import java.util.List;

interface VoteRepository extends CrudRepository<Vote, Long> {

    List<Vote> findBySongFilename(String songFilename);


}
