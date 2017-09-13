package com.keer.core.util.bean;

public class Stack<T extends Object> {
	private int maxsize;
	private Object stack[];
	private int top;

	public Stack(int max) {
		maxsize = max;
		stack = new Object[maxsize];
		top = -1;
	}
	public void push(T obj) {
		top++;
		stack[top] = obj;
	}

	@SuppressWarnings("unchecked")
	public T pop() {
		T temp = null;
		temp = (T)stack[top];
		top--;
		return temp;
	}

	public int getLength() {
		return top;
	}
	@SuppressWarnings("unchecked")
	public T look()
	{
		T temp = null;
		temp = (T)stack[top];
		return temp;
	}

	public boolean isEmpty() {
		if (top == -1)
			return true;
		else
			return false;
	}

	public boolean isFull() {
		if (top == maxsize - 1)
			return true;
		else
			return false;
	}
	
	public void clear(){
		top = -1;
	}
}
