# Test Python code for the LEGO editor
name = "LEGO Robot"
speed = 75
distance = 100

print(f"Robot name: {name}")
print(f"Speed: {speed}")
print(f"Distance: {distance}")

def calculate_time(dist, spd):
    return dist / spd

time_needed = calculate_time(distance, speed)
print(f"Time needed: {time_needed} seconds")

if speed > 50:
    print("Robot is moving fast!")
else:
    print("Robot is moving slowly")

# LEGO SPIKE Prime commands
hub.light_matrix.show_image("HAPPY")
hub.speaker.beep()
motor.run_for_seconds(2, speed)
