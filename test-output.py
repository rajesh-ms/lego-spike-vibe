# Test script to verify Python editor output functionality
print("Hello World!")
print("Testing variables...")

name = "LEGO SPIKE Prime"
print(f"Welcome to {name}")

speed = 50
if speed > 30:
    print("Moving fast!")
else:
    print("Moving slow!")

def calculate_time(distance, speed):
    return distance / speed

time = calculate_time(100, 25)
print(f"Time needed: {time} seconds")
