package com.example.santoshb.timer;

import android.app.Activity;
import android.app.AlarmManager;
import android.app.PendingIntent;
import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.os.Bundle;
import android.view.View;
import android.widget.Toast;

import java.util.Calendar;

//https://developer.android.com/training/scheduling/alarms.html
public class MyActivity extends Activity {

    private PendingIntent pendingIntent;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_my);
//
        Intent alarmIntent = new Intent(MyActivity.this, AlarmReceiver.class);
        pendingIntent = PendingIntent.getBroadcast(MyActivity.this, 0, alarmIntent, 0);

        AlarmManager alarmManager = (AlarmManager) getSystemService(ALARM_SERVICE);
        long currentTime = System.currentTimeMillis();
        long oneMinute = 5 * 1000;
        alarmManager.setInexactRepeating(
                AlarmManager.RTC_WAKEUP,
                currentTime + oneMinute,
                oneMinute,
                pendingIntent);
      //  setAlarm();

    }

    public void setAlarm() {
        AlarmManager manager = (AlarmManager) getSystemService(Context.ALARM_SERVICE);
        long interval = 5 * 1000; // 1 minute

        Toast.makeText(this, "Scheduled", Toast.LENGTH_SHORT).show();
        Intent launchIntent = new Intent(this, AlarmReceiver.class);
        PendingIntent alarmIntent = PendingIntent.getService(this, 0, launchIntent, 0);

        Calendar c = Calendar.getInstance();
        c.add(Calendar.SECOND, 5);
        long afterTenSeconds = c.getTimeInMillis();

        manager.setRepeating(AlarmManager.RTC_WAKEUP, afterTenSeconds, interval, alarmIntent);
    }


}

