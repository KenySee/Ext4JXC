package com.keer.core.service;

import com.keer.core.annotation.TopSubClass;
import com.keer.core.bean.base.AbstractAttachment;

@TopSubClass(AbstractAttachment.class)
public interface IAbstractAttachmentBizService<T extends AbstractAttachment> extends IGenericBizService<T> {

}
