# Test Script for Enhanced Python Editor
# This demonstrates all the print statement and simulation features

# 1. Basic print statements
print("Hello LEGO SPIKE Prime!")
print("Welcome to Python programming!")

# 2. Variables and print with f-strings
robot_name = "SuperBot"
speed = 75
is_ready = True

print(f"Robot name: {robot_name}")
print(f"Speed: {speed}")
print(f"Ready to go: {is_ready}")

# 3. Functions with print statements
def greet_robot():
    print(f"Hello, {robot_name}!")
    print("Ready for an adventure?")

def calculate_time(distance, speed):
    time_needed = distance / speed
    return time_needed

# 4. Function calls
greet_robot()

# 5. Function calls with return values
travel_time = calculate_time(100, speed)
print(f"Time to travel 100cm: {travel_time} seconds")

# 6. Conditional statements
if speed > 70:
    print("That's pretty fast!")
else:
    print("Nice and steady!")

# 7. LEGO SPIKE Prime specific commands
from spike import PrimeHub, Motor
import time

hub = PrimeHub()
motor = Motor('A')

hub.light_matrix.show_image('HAPPY')
hub.speaker.beep()
motor.run_for_seconds(2, 50)
time.sleep(1)

print("Robot program complete!")
