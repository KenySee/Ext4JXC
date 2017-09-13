package com.keer.core.service.impl;

import org.springframework.stereotype.Service;

import com.keer.core.bean.enums.entity.EntityEnum;
import com.keer.core.service.IEntityEnumBizService;
import com.keer.core.service.impl.GenericBizServiceImpl;

@Service("entityEnumBizService")
public class EntityEnumBizServiceImpl extends GenericBizServiceImpl<EntityEnum> implements IEntityEnumBizService {

}