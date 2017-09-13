package com.keer.core.annotation;

import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target({java.lang.annotation.ElementType.METHOD})
@Retention(RetentionPolicy.RUNTIME)
public @interface Permission {
	public abstract String action() default "";
	public abstract String desc() default "";
	public abstract boolean ignore() default false;
	public abstract Class<?> bean() default Object.class;
}
