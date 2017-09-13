package com.keer.core.util.bean;

public class ClassCache {
	private static final int TABLE_SIZE = 512;

	private static final int TABLE_SIZE_MASK = TABLE_SIZE - 1;

	private Entry[] table;

	private static class Entry extends Object {
		protected Entry next;
		protected Class<?> key;
		protected Object value;

		public Entry(Class<?> key, Object value) {
			super();
			this.key = key;
			this.value = value;
		}
	}

	public ClassCache() {
		super();
		this.table = new Entry[TABLE_SIZE];
	}

	public final Object get(Class<?> key) {
		Object result = null;
		int i = key.hashCode() & TABLE_SIZE_MASK;

		for (Entry entry = table[i]; entry != null; entry = entry.next) {
			if (entry.key == key) {
				result = entry.value;
				break;
			}
		}
		return result;
	}

	public final Object put(Class<?> key, Object value) {
		Object result = null;
		int i = key.hashCode() & TABLE_SIZE_MASK;
		Entry entry = table[i];

		if (entry == null) {
			table[i] = new Entry(key, value);
		} else {
			if (entry.key == key) {
				result = entry.value;
				entry.value = value;
			} else {
				while (true) {
					if (entry.key == key) {
						/* replace value */
						result = entry.value;
						entry.value = value;
						break;
					} else {
						if (entry.next == null) {
							/* add value */
							entry.next = new Entry(key, value);
							break;
						}
					}
					entry = entry.next;
				}
			}
		}
		return result;
	}
}
