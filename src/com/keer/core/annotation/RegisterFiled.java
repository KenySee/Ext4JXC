package com.keer.core.annotation;

import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target({java.lang.annotation.ElementType.FIELD})
@Retention(RetentionPolicy.RUNTIME)
public @interface RegisterFiled {
	public abstract String Name();
	public abstract String Alias() default "";
	public abstract String Code() default "";
	public abstract boolean Hide() default false;
	public abstract String Init() default "";
	public abstract int Sort();
}
