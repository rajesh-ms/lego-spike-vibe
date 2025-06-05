export interface Lesson {
  id: string;
  title: string;
  description: string;
  duration?: number; // in minutes
  estimatedTime?: number; // in minutes
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  type?: 'reading' | 'coding' | 'project';
  objectives?: string[];
  content?: string;
  codeExample?: string;
  challengeDescription?: string;
  challengeCode?: string;
}

export interface Unit {
  id: string;
  title: string;
  description: string;
  icon?: string;
  color?: string;
  lessons: Lesson[];
}

export interface Curriculum {
  units: Unit[];
}

const units: Unit[] = [
  {
    id: 'overview',
    title: 'Overview',
    description: 'Introduction to LEGO SPIKE Prime and programming concepts',
    icon: '🎯',
    color: 'bg-blue-500',
    lessons: [
      {
        id: 'what-is-spike-prime',
        title: 'What is LEGO SPIKE Prime?',
        description: 'Learn about the LEGO SPIKE Prime kit and its components',
        duration: 15,
        difficulty: 'beginner',
        objectives: [
          'Understand what LEGO SPIKE Prime is',
          'Identify the main components of the kit',
          'Learn about the Hub and its capabilities'
        ],
        content: `
# What is LEGO SPIKE Prime?

LEGO SPIKE Prime is an educational robotics kit designed to help students learn programming and engineering concepts through hands-on building and coding activities.

## Key Components:
- **Hub**: The brain of your robot with a 5x5 LED matrix
- **Motors**: Large and medium motors for movement
- **Sensors**: Color, distance, force sensors
- **Building Elements**: LEGO Technic beams, connectors, and wheels

## Why Learn Programming?
Programming allows you to bring your LEGO creations to life! You can make robots that:
- Move around and avoid obstacles
- Respond to light and color
- Play music and show patterns
- Solve puzzles and challenges

Let's start this exciting journey together! 🚀
        `,
        codeExample: `# This is what Python code looks like!
# We'll learn to write code like this:

from spike import PrimeHub

# Create a hub object
hub = PrimeHub()

# Make the hub smile!
hub.light_matrix.show_image('SMILE')

# Say hello!
print("Hello, LEGO SPIKE Prime!")`,
      },
      {
        id: 'programming-basics',
        title: 'Programming Basics',
        description: 'Understand fundamental programming concepts',
        duration: 20,
        difficulty: 'beginner',
        objectives: [
          'Learn what programming is',
          'Understand basic programming concepts',
          'See how programming controls robots'
        ],
        content: `
# Programming Basics

Programming is like giving instructions to a computer or robot. Just like following a recipe to bake cookies, we give step-by-step instructions to make our robot do what we want!

## What is a Program?
A program is a list of instructions written in a special language that computers understand. In our case, we use **Python** - a friendly programming language that's perfect for beginners.

## Basic Programming Concepts:

### 1. Instructions (Commands)
Each line of code tells the robot to do something specific:
- Turn on a light
- Move forward
- Play a sound

### 2. Sequence
Instructions are followed in order, from top to bottom.

### 3. Variables
Variables are like boxes that store information:
- Numbers (like speed: 50)
- Text (like name: "RobotBot")
- True/False values

### 4. Functions
Functions are groups of instructions that do a specific task. Think of them as mini-programs inside your main program!

Ready to start coding? Let's make our first program! 💻
        `,
        codeExample: `# My First SPIKE Prime Program!

from spike import PrimeHub
import time

# Create the hub
hub = PrimeHub()

# Show a heart on the LED matrix
hub.light_matrix.show_image('HEART')

# Wait for 2 seconds
time.sleep(2)

# Show a happy face
hub.light_matrix.show_image('HAPPY')

# Print a message
print("I love programming!")`,
        challengeDescription: 'Try to modify the code to show different images on the LED matrix and change the wait time.',
        challengeCode: `# Challenge: Customize Your Display
# Modify this code to show your favorite images!

from spike import PrimeHub
import time

hub = PrimeHub()

# TODO: Change this to show a different image
hub.light_matrix.show_image('HEART')

# TODO: Change the wait time
time.sleep(2)

# TODO: Add another image
hub.light_matrix.show_image('HAPPY')

print("Great job customizing!")`
      }
    ]
  },
  {
    id: 'software-and-hub',
    title: 'Introduction to Software and Hub',
    description: 'Getting familiar with the LEGO SPIKE app and Hub',
    icon: '💻',
    color: 'bg-green-500',
    lessons: [
      {
        id: 'spike-app-overview',
        title: 'SPIKE App Overview',
        description: 'Learn about the SPIKE Prime programming environment',
        duration: 25,
        difficulty: 'beginner',
        objectives: [
          'Navigate the SPIKE Prime app interface',
          'Connect to the Hub',
          'Understand the programming workspace'
        ],
        content: `
# SPIKE App Overview

The LEGO SPIKE Prime app is where all the magic happens! It's your programming workspace where you'll write code and control your robot.

## Key Features:

### 1. Hub Connection
- Connect your Hub via USB or Bluetooth
- See the Hub status (connected/disconnected)
- Update Hub firmware

### 2. Programming Interface
- **Block Coding**: Drag and drop blocks (great for beginners!)
- **Python Coding**: Write text-based code (what we'll focus on!)
- **Real-time execution**: See your code run immediately

### 3. Project Management
- Save your programs
- Organize projects by topic
- Share with friends and teachers

### 4. Built-in Help
- Code examples and tutorials
- Documentation for all functions
- Troubleshooting guides

## Getting Started:
1. Open the SPIKE Prime app
2. Connect your Hub
3. Create a new Python project
4. Start coding!

The app makes programming fun and easy. Let's explore it together! 🎮
        `,
        codeExample: `# Testing Hub Connection
# Run this code to check if your Hub is connected properly

from spike import PrimeHub
import time

# Create hub object
hub = PrimeHub()

# Test the connection
print("Testing Hub connection...")

# Flash the center button light
for i in range(3):
    hub.status_light.on('red')
    time.sleep(0.5)
    hub.status_light.on('green')
    time.sleep(0.5)

hub.status_light.off()
print("Hub test complete!")`
      }
    ]
  },
  {
    id: 'python-intro',
    title: 'Introduction to Python',
    description: 'Basic Python programming concepts',
    icon: '🐍',
    color: 'bg-yellow-500',
    lessons: [
      {
        id: 'python-basics',
        title: 'Python Basics',
        description: 'Learn Python fundamentals: variables, functions, and basic syntax',
        duration: 30,
        difficulty: 'beginner',
        objectives: [
          'Understand Python syntax',
          'Work with variables and data types',
          'Write your first Python functions'
        ],
        content: `
# Python Basics

Python is an amazing programming language that's perfect for beginners! It reads almost like English, making it easy to understand.

## Variables - Storing Information

Variables are like labeled boxes where we store information:

\`\`\`python
robot_name = "RobotBot"    # Text (string)
speed = 75                # Number (integer)
is_moving = True          # True/False (boolean)
\`\`\`

## Functions - Doing Things

Functions are blocks of code that perform specific tasks:

\`\`\`python
def say_hello():
    print("Hello from RobotBot!")

def move_forward(distance):
    print(f"Moving {distance} cm forward")
\`\`\`

## Basic Python Rules:

### 1. Indentation Matters!
Python uses spaces (indentation) to group code together:

\`\`\`python
if robot_name == "RobotBot":
    print("That's my robot!")  # This line is indented
    print("I love my robot!")  # This line too!
\`\`\`

### 2. Comments Start with #
Use comments to explain your code:

\`\`\`python
# This is a comment - it explains what the code does
speed = 50  # Set the robot's speed
\`\`\`

### 3. Import Libraries
Use 'import' to add extra capabilities:

\`\`\`python
from spike import PrimeHub  # Import SPIKE Prime functions
import time                 # Import time functions
\`\`\`

Python is fun and powerful - let's start coding! 🐍✨
        `,
        codeExample: `# Python Basics Practice
# Let's learn variables, functions, and more!

# 1. Variables
robot_name = "SuperBot"
speed = 80
is_ready = True

print(f"Robot name: {robot_name}")
print(f"Speed: {speed}")
print(f"Ready to go: {is_ready}")

# 2. Functions
def greet_robot():
    print(f"Hello, {robot_name}!")
    print("Ready for an adventure?")

def calculate_time(distance, speed):
    time_needed = distance / speed
    return time_needed

# 3. Using our functions
greet_robot()

# Calculate how long to travel 100cm at our speed
travel_time = calculate_time(100, speed)
print(f"Time to travel 100cm: {travel_time} seconds")

# 4. Making decisions
if speed > 70:
    print("That's pretty fast!")
else:
    print("Nice and steady!")`,
        challengeDescription: 'Create your own variables and functions! Try making a function that calculates the area of a rectangle.',
        challengeCode: `# Challenge: Create Your Own Functions!

# TODO: Create variables for your robot
robot_name = ""  # Give your robot a cool name!
favorite_color = ""  # What's your robot's favorite color?

# TODO: Create a function that introduces your robot
def introduce_robot():
    # Write code here to introduce your robot
    pass

# TODO: Create a function that calculates rectangle area
def calculate_area(length, width):
    # Calculate and return the area
    # Area = length × width
    pass

# TODO: Test your functions
introduce_robot()

# Test your area function
area = calculate_area(5, 3)
print(f"Area of rectangle: {area}")

print("Great job creating functions!")`
      }
    ]
  },
  {
    id: 'movement',
    title: 'Movement',
    description: 'Programming motors and movement',
    icon: '🏃',
    color: 'bg-red-500',
    lessons: [
      {
        id: 'motor-basics',
        title: 'Motor Basics',
        description: 'Learn how to control motors for movement',
        duration: 35,
        difficulty: 'beginner',
        objectives: [
          'Connect and control motors',
          'Make your robot move forward and backward',
          'Control speed and direction'
        ],
        content: `
# Motor Basics

Motors are what make your robot move! The SPIKE Prime kit comes with different types of motors that can spin wheels, move arms, and much more.

## Types of Motors:

### 1. Large Motor
- Strong and powerful
- Great for moving heavy robots
- Can turn wheels or drive mechanisms

### 2. Medium Motor
- Smaller and lighter
- Perfect for precise movements
- Good for arms, grippers, or small wheels

## Connecting Motors:
Motors connect to ports A, B, C, D, E, or F on the Hub. Always remember which port you're using!

## Basic Motor Commands:

### Starting a Motor:
\`\`\`python
motor.start()  # Start spinning
\`\`\`

### Controlling Speed:
\`\`\`python
motor.start(50)   # Medium speed (0-100)
motor.start(100)  # Full speed!
motor.start(-75)  # Reverse at 75% speed
\`\`\`

### Stopping a Motor:
\`\`\`python
motor.stop()  # Stop the motor
\`\`\`

### Moving Specific Amounts:
\`\`\`python
motor.run_for_degrees(360)  # Turn exactly one full rotation
motor.run_for_seconds(2)    # Run for 2 seconds
\`\`\`

## Making Your Robot Move:
To make a robot drive forward, you typically need two motors (one for each side). Both motors spin forward to go forward, and in opposite directions to turn!

Ready to make your robot move? Let's code! 🚗💨
        `,
        codeExample: `# Motor Control Basics
# Let's make a motor spin and control its movement!

from spike import Motor
import time

# Create a motor object (connected to port A)
drive_motor = Motor('A')

print("Motor control demo starting...")

# 1. Basic spinning
print("1. Spinning forward for 2 seconds")
drive_motor.start(50)  # 50% speed forward
time.sleep(2)
drive_motor.stop()

# 2. Reverse direction
print("2. Spinning backward for 2 seconds")
drive_motor.start(-50)  # 50% speed backward
time.sleep(2)
drive_motor.stop()

# 3. Precise movement
print("3. Exact rotation - one full turn")
drive_motor.run_for_degrees(360)  # Exactly 360 degrees

# 4. Variable speed demo
print("4. Speed demonstration")
speeds = [25, 50, 75, 100]

for speed in speeds:
    print(f"Running at {speed}% speed")
    drive_motor.start(speed)
    time.sleep(1)
    drive_motor.stop()
    time.sleep(0.5)

print("Motor demo complete!")`,
        challengeDescription: 'Connect a motor to port B and make it do a fun dance! Try different speeds and directions.',
        challengeCode: `# Challenge: Motor Dance Party!
# Make your motor do a cool dance routine

from spike import Motor
import time

# TODO: Create a motor connected to port B
motor = Motor('B')

print("🕺 Motor Dance Party! 🕺")

# TODO: Create a dance routine!
# Ideas:
# - Fast spins followed by slow spins
# - Forward and backward combinations
# - Different speeds in sequence
# - Pauses between movements

# Example start (you can change this!):
print("Starting the dance...")

# TODO: Add your dance moves here!
# motor.start(?)
# time.sleep(?)
# motor.stop()

print("Dance complete! Great job! 🎉")`
      }
    ]
  },
  {
    id: 'sensors-outputs',
    title: 'Sensors and Outputs',
    description: 'Working with sensors, lights, and sounds',
    icon: '👁️',
    color: 'bg-purple-500',
    lessons: [
      {
        id: 'color-sensor',
        title: 'Color Sensor',
        description: 'Learn to use the color sensor to detect colors and light',
        duration: 30,
        difficulty: 'intermediate',
        objectives: [
          'Connect and use the color sensor',
          'Detect different colors',
          'Respond to color changes'
        ],
        content: `
# Color Sensor

The color sensor is like your robot's eye! It can see colors and measure how bright or dark things are.

## What Can the Color Sensor Do?

### 1. Detect Colors
The sensor can recognize these colors:
- Red, Green, Blue
- Yellow, Magenta, Cyan
- White, Black

### 2. Measure Light
- Read ambient light levels
- Detect reflected light
- Work as a flashlight!

## Using the Color Sensor:

### Basic Setup:
\`\`\`python
from spike import ColorSensor

color_sensor = ColorSensor('A')  # Connected to port A
\`\`\`

### Reading Colors:
\`\`\`python
# Get the color name
color = color_sensor.get_color()
print(f"I see: {color}")

# Colors can be: 'red', 'green', 'blue', 'yellow', 
#                'magenta', 'cyan', 'white', 'black', or None
\`\`\`

### Reading Light Levels:
\`\`\`python
# Get ambient light (0-100)
light_level = color_sensor.get_ambient_light()
print(f"Light level: {light_level}%")

# Get reflected light (0-100)
reflected = color_sensor.get_reflected_light()
print(f"Reflected light: {reflected}%")
\`\`\`

### Using the Built-in Lights:
\`\`\`python
# Turn on the sensor's lights
color_sensor.light_up_all()        # All lights on
color_sensor.light_up(100, 0, 0)   # Red light only
color_sensor.light_up(0, 100, 0)   # Green light only
color_sensor.light_up(0, 0, 100)   # Blue light only
\`\`\`

## Fun Project Ideas:
- Color-following robot
- Traffic light detector
- Mood light that changes with colors
- Color sorting machine

The color sensor opens up so many possibilities! 🌈👁️
        `,
        codeExample: `# Color Sensor Explorer
# Let's discover what colors are around us!

from spike import ColorSensor, PrimeHub
import time

# Setup
color_sensor = ColorSensor('A')
hub = PrimeHub()

print("🌈 Color Sensor Explorer 🌈")
print("Hold different colored objects in front of the sensor!")

# Color detection loop
for i in range(20):  # Check colors 20 times
    # Read the color
    detected_color = color_sensor.get_color()
    
    # Read light levels
    ambient = color_sensor.get_ambient_light()
    reflected = color_sensor.get_reflected_light()
    
    # Show results
    if detected_color:
        print(f"Color detected: {detected_color.upper()}!")
        
        # Light up the sensor with the detected color
        if detected_color == 'red':
            color_sensor.light_up(100, 0, 0)
        elif detected_color == 'green':
            color_sensor.light_up(0, 100, 0)
        elif detected_color == 'blue':
            color_sensor.light_up(0, 0, 100)
        else:
            color_sensor.light_up_all()
            
        # Show color on hub matrix
        if detected_color == 'red':
            hub.light_matrix.show_image('HEART')
        elif detected_color == 'green':
            hub.light_matrix.show_image('YES')
        elif detected_color == 'blue':
            hub.light_matrix.show_image('HAPPY')
        else:
            hub.light_matrix.show_image('SURPRISED')
    else:
        print(f"Light levels - Ambient: {ambient}%, Reflected: {reflected}%")
        color_sensor.light_up_all()
        hub.light_matrix.show_image('CONFUSED')
    
    time.sleep(1)

print("Color exploration complete!")`,
        challengeDescription: 'Create a color-reactive program! Make the Hub show different images or play sounds when different colors are detected.',
        challengeCode: `# Challenge: Color Reactive Robot!
# Make your robot react differently to each color

from spike import ColorSensor, PrimeHub
import time

# Setup
color_sensor = ColorSensor('A')
hub = PrimeHub()

print("🎨 Color Reactive Robot! 🎨")

# TODO: Run this loop to detect colors
for i in range(15):
    color = color_sensor.get_color()
    
    if color == 'red':
        # TODO: What should happen when red is detected?
        # Ideas: show HEART, play angry sound, flash red light
        pass
    
    elif color == 'green':
        # TODO: What should happen when green is detected?
        # Ideas: show YES, play happy sound, flash green light
        pass
    
    elif color == 'blue':
        # TODO: What should happen when blue is detected?
        # Ideas: show HAPPY, play calm sound, flash blue light
        pass
    
    elif color == 'yellow':
        # TODO: What should happen when yellow is detected?
        # Ideas: show SUN, play cheerful sound, flash yellow light
        pass
    
    else:
        # TODO: What should happen when no color is detected?
        print("Waiting for a color...")
        hub.light_matrix.show_image('CONFUSED')
    
    time.sleep(1)

print("Great job creating color reactions! 🌟")`
      }
    ]
  },
  {
    id: 'advanced-programming',
    title: 'Advanced Programming',
    description: 'Complex projects and algorithms',
    icon: '🚀',
    color: 'bg-indigo-500',
    lessons: [
      {
        id: 'loops-and-conditions',
        title: 'Loops and Conditions',
        description: 'Master loops, if-statements, and complex logic',
        duration: 40,
        difficulty: 'advanced',
        objectives: [
          'Understand different types of loops',
          'Use if-elif-else statements effectively',
          'Combine conditions with logical operators'
        ],
        content: `
# Loops and Conditions

Now we're getting into the really powerful stuff! Loops and conditions let your robot make decisions and repeat actions automatically.

## Loops - Repeating Actions

### 1. For Loops (Counting)
For loops repeat a specific number of times:

\`\`\`python
# Repeat 5 times
for i in range(5):
    print(f"Count: {i}")
    
# Count from 1 to 10
for number in range(1, 11):
    print(f"Number: {number}")
\`\`\`

### 2. While Loops (Conditional Repeating)
While loops continue until a condition becomes false:

\`\`\`python
speed = 0
while speed < 100:
    print(f"Current speed: {speed}")
    speed += 10  # Increase speed by 10
\`\`\`

## Conditions - Making Decisions

### 1. If Statements
\`\`\`python
color = color_sensor.get_color()

if color == 'red':
    print("Stop!")
elif color == 'green':
    print("Go!")
else:
    print("Proceed with caution")
\`\`\`

### 2. Logical Operators
Combine conditions with AND, OR, NOT:

\`\`\`python
# AND - both must be true
if color == 'red' and speed > 50:
    print("Emergency brake!")

# OR - either can be true
if color == 'green' or color == 'blue':
    print("Safe to proceed")

# NOT - opposite condition
if not (color == 'red'):
    print("Not red, keep going")
\`\`\`

## Advanced Patterns:

### Nested Loops:
\`\`\`python
for row in range(3):
    for col in range(3):
        print(f"Position: ({row}, {col})")
\`\`\`

### Loop Control:
\`\`\`python
for i in range(10):
    if i == 5:
        break  # Exit the loop
    if i == 2:
        continue  # Skip this iteration
    print(i)
\`\`\`

These concepts let you create really smart robots! 🧠🤖
        `,
        codeExample: `# Advanced Programming Demo
# Loops, conditions, and smart robot behavior!

from spike import PrimeHub, ColorSensor, Motor
import time
import random

# Setup
hub = PrimeHub()
color_sensor = ColorSensor('A')
motor = Motor('B')

print("🤖 Smart Robot Demo 🤖")

# 1. Counting loop with conditions
print("\\n1. Smart Counter:")
for count in range(1, 11):
    # Show different patterns based on the number
    if count % 2 == 0:  # Even numbers
        hub.light_matrix.show_image('YES')
        print(f"{count} is even!")
    else:  # Odd numbers
        hub.light_matrix.show_image('NO')
        print(f"{count} is odd!")
    
    time.sleep(0.5)

# 2. Color-responsive loop
print("\\n2. Color Detective (10 seconds):")
start_time = time.time()

while time.time() - start_time < 10:  # Run for 10 seconds
    color = color_sensor.get_color()
    light_level = color_sensor.get_ambient_light()
    
    # Complex decision making
    if color == 'red' and light_level > 50:
        print("Bright red detected - Emergency mode!")
        hub.light_matrix.show_image('NO')
        motor.start(100)
    elif color == 'green' or color == 'blue':
        print(f"Cool color {color} - Calm mode")
        hub.light_matrix.show_image('HAPPY')
        motor.start(25)
    elif light_level < 20:
        print("It's dark - Sleep mode")
        hub.light_matrix.show_image('ASLEEP')
        motor.stop()
    else:
        print("Normal operation")
        hub.light_matrix.show_image('CONFUSED')
        motor.start(50)
    
    time.sleep(0.5)

motor.stop()

# 3. Random pattern generator
print("\\n3. Random Pattern Generator:")
patterns = ['HEART', 'HAPPY', 'SURPRISED', 'YES', 'NO']

for i in range(8):
    # Pick a random pattern
    pattern = random.choice(patterns)
    hub.light_matrix.show_image(pattern)
    print(f"Pattern {i+1}: {pattern}")
    
    # Random delay between 0.5 and 1.5 seconds
    delay = random.uniform(0.5, 1.5)
    time.sleep(delay)

hub.light_matrix.show_image('SMILE')
print("\\nAdvanced demo complete! 🎉")`,
        challengeDescription: 'Create a robot that patrols an area! Use loops to make it move in a pattern, and conditions to react to colors or obstacles.',
        challengeCode: `# Challenge: Robot Patrol System!
# Create a robot that patrols and reacts to its environment

from spike import PrimeHub, ColorSensor, Motor
import time

# Setup your components
hub = PrimeHub()
# TODO: Add your sensors and motors here
# color_sensor = ColorSensor('?')
# left_motor = Motor('?')
# right_motor = Motor('?')

print("🛡️ Robot Patrol System Activated! 🛡️")

# TODO: Create a patrol pattern using loops
# Ideas for your patrol system:
# 1. Move in a square pattern
# 2. Check for colors at each corner
# 3. React differently to different colors
# 4. Count how many patrols completed

patrol_count = 0
max_patrols = 3

# TODO: Main patrol loop
while patrol_count < max_patrols:
    print(f"Starting patrol #{patrol_count + 1}")
    
    # TODO: Create your patrol pattern here
    # For example, move forward, turn, repeat 4 times for a square
    
    for side in range(4):  # Four sides of a square
        print(f"Moving along side {side + 1}")
        
        # TODO: Move forward
        # left_motor.start(50)
        # right_motor.start(50)
        # time.sleep(2)
        
        # TODO: Check for colors or obstacles
        # color = color_sensor.get_color()
        # if color == 'red':
        #     print("Alert! Red detected!")
        #     # TODO: Add your alert behavior
        # elif color == 'green':
        #     print("All clear - green detected")
        #     # TODO: Add your all-clear behavior
        
        # TODO: Turn (one motor forward, one backward)
        # left_motor.start(50)
        # right_motor.start(-50)
        # time.sleep(1)
        
        # TODO: Stop motors
        # left_motor.stop()
        # right_motor.stop()
        
        time.sleep(0.5)  # Brief pause
    
    patrol_count += 1
    print(f"Patrol #{patrol_count} completed!")
    
    # TODO: Add a rest period between patrols
    hub.light_matrix.show_image('HAPPY')
    time.sleep(2)

print("🎉 Patrol mission complete! All areas secured!")
hub.light_matrix.show_image('YES')`
      }
    ]
  }
];

export const curriculum: Curriculum = {
  units
};
