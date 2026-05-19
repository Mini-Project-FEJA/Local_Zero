package feja.localzero.dto;

import feja.localzero.entity.EcoActionType;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class EcoActionRequest {

    private EcoActionType actionType;
    private Long userId;
}