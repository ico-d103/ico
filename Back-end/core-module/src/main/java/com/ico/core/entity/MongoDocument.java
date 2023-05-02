package com.ico.core.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection="test_mongo")
@Getter
@Setter
@NoArgsConstructor
public class MongoDocument {

    @Id
    private String id;

    private String name;
}
