package com.ico.api.util;

import org.springframework.stereotype.Component;

import java.text.NumberFormat;
import java.time.format.DateTimeFormatter;
import java.util.Locale;

/**
 * formatter
 *
 * @author 서재건
 */
@Component
public class Formatter {

    public static final DateTimeFormatter date = DateTimeFormatter.ofPattern("yyyy.MM.dd");

    public static final DateTimeFormatter dateTime = DateTimeFormatter.ofPattern("yyyy.MM.dd-HH:mm");

    public static final NumberFormat number = NumberFormat.getInstance(Locale.US);
}
