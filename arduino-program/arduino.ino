#include <TheThingsNetwork.h>

// Set your DevAddr, NwkSKey, AppSKey and the frequency plan
const char *devAddr = "XXXX";
const char *nwkSKey = "XXXX";
const char *appSKey = "XXXX";

#define loraSerial Serial1
#define debugSerial SerialUSB

// Replace REPLACE_ME with TTN_FP_EU868 or TTN_FP_US915
#define freqPlan TTN_FP_EU868

int oldValue;

TheThingsNetwork ttn(loraSerial, debugSerial, freqPlan);

void setup()
{
  loraSerial.begin(57600);
  debugSerial.begin(9600);

  // Wait a maximum of 10s for Serial Monitor
  while (!debugSerial && millis() < 10000)
    ;

  debugSerial.println("-- PERSONALIZE");
  ttn.personalize(devAddr, nwkSKey, appSKey);

  debugSerial.println("-- STATUS");
  ttn.showStatus();

  // set button input
  pinMode(2, INPUT_PULLUP);

  oldValue = digitalRead(2);
}

void loop()
{
  debugSerial.println("-- LOOP");
  int newValue = digitalRead(2);

  if (newValue != oldValue) {
    debugSerial.println("State changed");
    // Prepare payload of 1 byte to indicate status
    byte payload[1];
    payload[0] = newValue;

    // Send it off
    ttn.sendBytes(payload, sizeof(payload));
  }


  oldValue = newValue;
  delay(150);
}
