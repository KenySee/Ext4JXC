package com.keer.core.util;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import java.net.NetworkInterface;
import java.util.Date;
import java.util.Enumeration;

/**
 * id生成器
 * twitter的snowflake 的实现
 * 时间戳+数据中心号+机器号+序列号
 */
public class IdGen {

    private final Log logger = LogFactory.getLog(getClass());
    private static final long twepoch = 1288834974657L;
    private static final long workerIdBits = 5L;
    private static final long datacenterIdBits = 5L;
    private static final long maxWorkerId = -1L ^ (-1L << workerIdBits);
    private static final long maxDatacenterId = -1L ^ (-1L << datacenterIdBits);
    private static final long sequenceBits = 12L;
    private static final long workerIdShift = sequenceBits;
    private static final long datacenterIdShift = sequenceBits + workerIdBits;
    private static final long timestampLeftShift = sequenceBits + workerIdBits + datacenterIdBits;
    private static final long sequenceMask = -1L ^ (-1L << sequenceBits);

    private static long workerId;
    private static long datacenterId;
    private static long sequence = 0L;
    private static long lastTimestamp = -1L;

    private static final IdGen idGen = new IdGen(initId());

    public static long next() {
        return idGen.nextId();
    }

    public static String nextS() {
        return String.format("%d", idGen.nextId());
    }

    public static Date time(long id) {
        return new Date((id >> timestampLeftShift) + twepoch);
    }

    public IdGen(int[] initids) {
        new IdGen(initids[0], initids[1]);
    }

    public IdGen(long workerId, long datacenterId) {
        logger.info(String.format("workerId:%d,datacenterId:%d",workerId,datacenterId));
        if (workerId > maxWorkerId || workerId < 0) {
            throw new IllegalArgumentException(String.format("worker Id can't be greater than %d or less than 0", maxWorkerId));
        }
        if (datacenterId > maxDatacenterId || datacenterId < 0) {
            throw new IllegalArgumentException(String.format("datacenter Id can't be greater than %d or less than 0", maxDatacenterId));
        }
        this.workerId = workerId;
        this.datacenterId = datacenterId;
    }

    public synchronized long nextId() {
        long timestamp = timeGen();
        if (timestamp < lastTimestamp) {
            throw new RuntimeException(String.format("Clock moved backwards.  Refusing to generate id for %d milliseconds", lastTimestamp - timestamp));
        }
        if (lastTimestamp == timestamp) {
            sequence = (sequence + 1) & sequenceMask;
            if (sequence == 0) {
                timestamp = tilNextMillis(lastTimestamp);
            }
        } else {
            sequence = 0L;
        }

        lastTimestamp = timestamp;

        return ((timestamp - twepoch) << timestampLeftShift) | (datacenterId << datacenterIdShift) | (workerId << workerIdShift) | sequence;
    }

    protected long tilNextMillis(long lastTimestamp) {
        long timestamp = timeGen();
        while (timestamp <= lastTimestamp) {
            timestamp = timeGen();
        }
        return timestamp;
    }

    protected long timeGen() {
        return System.currentTimeMillis();
    }


    private static int[] initId() {
        try {
            Enumeration<NetworkInterface> el = NetworkInterface.getNetworkInterfaces();
            while (el.hasMoreElements()) {
                byte[] mac = el.nextElement().getHardwareAddress();
                if (mac == null || (mac[0] == (byte) 0 && mac[1] == (byte) 0 && mac[2] == (byte) 0))
                    continue;
                int work = byteToInt2(new byte[]{mac[0], mac[1], mac[2]});
                int datacenter = byteToInt2(new byte[]{mac[3], mac[4], mac[5]});
                return new int[]{Math.abs(work) % 32, Math.abs(datacenter) % 32};
            }
        } catch (Exception e) {
            return new int[]{0, 0};
        }
        return new int[]{0, 0};

    }

    private static int byteToInt2(byte[] b) {

        int mask = 0xff;
        int temp = 0;
        int n = 0;
        for (int i = 0; i < 3; i++) {
            n <<= 8;
            temp = b[i] & mask;
            n |= temp;
        }
        return n;
    }
}
