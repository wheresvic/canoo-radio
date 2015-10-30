package com.canoo.radio.server;

public final class Strings {

    public static final boolean isNullOrEmpty(String str) {
        if (str == null || "".equals(str)) {
            return true;
        }

        return false;
    }
}
