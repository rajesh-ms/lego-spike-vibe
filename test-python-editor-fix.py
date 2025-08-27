# Test Python code to verify print statement handling

# Test 1: Simple string
print("Hello World")

# Test 2: Multiple arguments with string and variable
name = "Alice"
print("My name is", name)

# Test 3: Multiple mixed arguments
age = 10
print("Hello", name, "you are", age, "years old")

# Test 4: F-string
print(f"Hello {name}, you are {age} years old")

# Test 5: Numbers and calculations
distance = 100
speed = 25
print("Distance:", distance, "Speed:", speed)

# Test 6: Function with print
def calculate_time(dist, spd):
    result = dist / spd
    print("Time needed:", result, "seconds")
    return result

time_result = calculate_time(distance, speed)
print("Final result:", time_result)
