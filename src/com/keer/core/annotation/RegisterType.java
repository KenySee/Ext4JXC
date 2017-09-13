package com.keer.core.annotation;

import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target({java.lang.annotation.ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
public @interface RegisterType {
	public abstract String Name();
	public abstract String Group() default "";
	public abstract String Desc() default "";
	public abstract int Sort() default 0;
}
