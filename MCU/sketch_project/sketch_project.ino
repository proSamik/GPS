#include <ESP8266WiFi.h>
#include <PubSubClient.h>

#define IR_SENSOR_PIN1 D5 // Define D5 as the first IR sensor pin
#define IR_SENSOR_PIN2 D6 // Define D6 as the second IR sensor pin

// Replace these with your WiFi network settings
const char* ssid = "aapka";
const char* password = "samik1234";

// MQTT Broker IP address
const char* mqtt_broker = "91.121.93.94";

// MQTT topics
const char* topic_parking_space_1 = "parking/space/001";
const char* topic_parking_space_2 = "parking/space/002";

WiFiClient espClient;
PubSubClient client(espClient);

void setup_wifi() {
    Serial.print("Connecting to ");
    Serial.println(ssid);
    WiFi.begin(ssid, password);
    while (WiFi.status() != WL_CONNECTED) {
        delay(500);
        Serial.print(".");
    }
    Serial.println("");
    Serial.println("WiFi connected");
    Serial.print("IP address: ");
    Serial.println(WiFi.localIP());
}

void callback(char* topic, byte* payload, unsigned int length) {
    Serial.print("Message arrived [");
    Serial.print(topic);
    Serial.print("] ");
    char message[length + 1];
    for (unsigned int i = 0; i < length; i++) {
        message[i] = (char)payload[i];
    }
    message[length] = '\0';
    Serial.println(message);

    // Handle messages if needed (this part is specific to commands you may receive)
}

void reconnect() {
    while (!client.connected()) {
        Serial.print("Attempting MQTT connection...");
        String clientId = "ESP8266Client-";
        clientId += String(random(0xffff), HEX);
        if (client.connect(clientId.c_str())) {
            Serial.println("connected");
            // Subscribe to topics if you expect to receive commands
            //client.subscribe(topic_parking_space_1);
            //client.subscribe(topic_parking_space_2);
            Serial.println("Subscribed to topics");
        } else {
            Serial.print("failed, rc=");
            Serial.print(client.state());
            Serial.println(" try again in 5 seconds");
            delay(5000);
        }
    }
}

void setup() {
    pinMode(IR_SENSOR_PIN1, INPUT);
    pinMode(IR_SENSOR_PIN2, INPUT);
    Serial.begin(115200);
    setup_wifi();
    client.setServer(mqtt_broker, 1883);
    client.setCallback(callback);
}

void loop() {
    if (!client.connected()) {
        reconnect();
    }
    client.loop();

    int irValue1 = digitalRead(IR_SENSOR_PIN1);
    int irValue2 = digitalRead(IR_SENSOR_PIN2);

    // Publish parking space statuses
    client.publish(topic_parking_space_1, irValue1 == LOW ? "occupied" : "vacant");
    Serial.print("Parking Space 1 is ");
    Serial.println(irValue1 == LOW ? "occupied" : "vacant");

    client.publish(topic_parking_space_2, irValue2 == LOW ? "occupied" : "vacant");
    Serial.print("Parking Space 2 is ");
    Serial.println(irValue2 == LOW ? "occupied" : "vacant");

    delay(1000); // Delay to prevent excessive messaging
}
