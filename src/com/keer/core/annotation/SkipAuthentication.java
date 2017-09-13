package com.keer.core.annotation;

import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * 忽略权限验证
 * @author 周方明
 *
 */
@Target({java.lang.annotation.ElementType.TYPE,java.lang.annotation.ElementType.METHOD})
@Retention(RetentionPolicy.RUNTIME)
public @interface SkipAuthentication {

}
