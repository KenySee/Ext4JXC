package com.keer.core.service.impl;

import org.springframework.stereotype.Service;

import com.keer.core.bean.base.Post;
import com.keer.core.service.IPostBizService;
import com.keer.core.service.impl.GenericBizServiceImpl;

@Service("postBizService")
public class PostBizServiceImpl extends GenericBizServiceImpl<Post> implements IPostBizService {

}