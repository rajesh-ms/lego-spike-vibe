export interface Lesson {
  id: string;
  title: string;
  description: string;
  duration?: number;
  estimatedTime?: number;
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  type?: 'reading' | 'coding' | 'project';
  objectives?: string[];
  content?: string;
  codeExample?: string;
  challengeDescription?: string;
  challengeCode?: string;
  videoUrl?: string;
  githubLinks?: string[];
  additionalResources?: {
    title: string;
    url: string;
    description: string;
  }[];
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
          'Learn what you can build and program'
        ],
        content: `# What is LEGO SPIKE Prime? 🎯

LEGO SPIKE Prime is an amazing robotics kit that combines the fun of LEGO building with the power of programming!

## What's in the Kit? 📦

### The Hub (The Brain) 🧠
- This is the smart center of your robot
- It has a 5x5 LED display that can show pictures and patterns
- Built-in speaker for sounds and music
- Bluetooth to connect to your computer or tablet
- 6 ports (A, B, C, D, E, F) to connect motors and sensors

### Motors (The Muscles) 💪
- **Large Motors**: Strong and powerful, perfect for driving wheels
- **Medium Motors**: Smaller but precise, great for arms and mechanisms

### Sensors (The Senses) 👁️
- **Color Sensor**: Can see different colors and measure light
- **Distance Sensor**: Uses ultrasonic waves to measure distances
- **Force Sensor**: Can detect when it's pressed or touched

Ready to start your robotics adventure? Let's build and code something amazing! 🚀✨`,
        codeExample: `# Welcome to LEGO SPIKE Prime Programming!
from spike import PrimeHub

hub = PrimeHub()
hub.light_matrix.write("Hi!")
hub.light_matrix.show_image('HAPPY')
hub.speaker.beep()
print("Welcome to LEGO SPIKE Prime! 🎉")`,
        challengeDescription: 'Explore your LEGO SPIKE Prime kit! Find all the motors, sensors, and the Hub.',
        challengeCode: `# Challenge: Kit Exploration
from spike import PrimeHub

hub = PrimeHub()
print("🔍 Kit Exploration Challenge!")

# TODO: Make the Hub display your initials
hub.light_matrix.write("???")  # Replace ??? with your initials

# TODO: Try different images
hub.light_matrix.show_image('HAPPY')

# TODO: Change the Hub's LED color
hub.status_light.on('green')

print("Great job exploring! 🎉")`
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
        description: 'Learn to use the LEGO SPIKE Prime app for programming',
        duration: 20,
        difficulty: 'beginner',
        objectives: [
          'Navigate the SPIKE Prime app interface',
          'Connect your Hub to the app',
          'Understand different programming modes'
        ],
        content: `# SPIKE App Overview 📱

The LEGO SPIKE Prime app is your gateway to programming! It's where you'll write code, test your robots, and bring your creations to life.

## Getting Started 🚀

### Download and Install
- Available for tablets, computers, and smartphones
- Free download from LEGO Education website
- Works on Windows, Mac, iOS, and Android

## Main Interface Areas 🖥️

1. **Project Gallery** - Your saved robot projects
2. **Programming Canvas** - Where you write Python code
3. **Hardware Panel** - Shows connected Hub and devices
4. **Console/Output** - Messages from your running programs

## Connecting Your Hub 🔗

1. Turn on your Hub (press the center button)
2. Open the SPIKE app on your device
3. Click "Connect" in the app
4. Select your Hub from the list
5. Wait for the green connection indicator

Ready to connect your Hub and start coding? Let's get everything set up! 🔧✨`,
        codeExample: `# SPIKE App Test
from spike import PrimeHub
import time

hub = PrimeHub()
print("🔍 SPIKE App Connection Test")

# Test Hub Display
print("Test 1: LED Display")
hub.light_matrix.write("TEST")
time.sleep(2)
hub.light_matrix.show_image('HAPPY')

# Test Speaker
print("Test 2: Speaker")
hub.speaker.beep()

print("🎉 Connection test complete!")`
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
        content: `# Motor Basics 🏃

Motors are what make your robot move! The SPIKE Prime kit comes with different types of motors.

## Types of Motors 🔧

### Large Motor (The Powerhouse)
- Strong and powerful
- Great for moving heavy robots
- Higher torque for tough jobs

### Medium Motor (The Precision Tool)
- Smaller and lighter
- Perfect for precise movements
- Faster rotation speed

## Connecting Motors 🔌
Motors connect to ports A, B, C, D, E, or F on the Hub. 

**Pro Tip**: Use ports A and B for driving wheels (left and right).

## Basic Motor Commands ⚙️

Motors can be controlled in many different ways. You can start them, stop them, and make them move precise amounts.

Ready to make your robot move? Let's start coding! 🚀`,
        codeExample: `# Motor Control Basics
from spike import Motor
import time

# Create a motor object (connected to port A)
drive_motor = Motor('A')

print("🏁 Motor control demo starting...")

# Basic spinning
print("1. Spinning forward for 2 seconds")
drive_motor.start(50)  # 50% speed forward
time.sleep(2)
drive_motor.stop()

# Reverse direction
print("2. Spinning backward for 2 seconds")  
drive_motor.start(-50)  # 50% speed backward
time.sleep(2)
drive_motor.stop()

print("🎉 Motor demo complete!")`
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
          'Create color-responsive behaviors'
        ],
        content: `# Color Sensor 👁️

The color sensor is like giving your robot eyes! It can see colors, measure light, and detect nearby objects.

## What Can the Color Sensor Do? 🌈

### Color Detection
Recognizes: Red, Green, Blue, Yellow, Purple, Cyan, White, Black

### Light Measurement
- Measures brightness from 0% (dark) to 100% (very bright)
- Can work as a light meter

### Proximity Detection
- Can sense when objects are close
- Useful for detecting walls or obstacles

## Connecting the Color Sensor 🔌

Connect the color sensor to any port (A, B, C, D, E, or F) on your Hub.

Ready to give your robot the power of sight? Let's start detecting colors! 🌈✨`,
        codeExample: `# Color Sensor Basics
from spike import ColorSensor, PrimeHub
import time

# Set up color sensor and hub
color_sensor = ColorSensor('A')  # Connected to port A
hub = PrimeHub()

print("👁️ Color Detection Demo")

# Color detection loop
for i in range(5):  # Check colors 5 times
    print(f"Reading {i+1}/5:")
    
    # Get color information
    detected_color = color_sensor.get_color()
    print(f"  Color: {detected_color}")
    
    # Respond to specific colors
    if detected_color == 'red':
        print("  🔴 RED ALERT!")
        hub.light_matrix.show_image('NO')
    elif detected_color == 'green':
        print("  🟢 Green means GO!")
        hub.light_matrix.show_image('YES')
    else:
        hub.light_matrix.write("?")
    
    time.sleep(2)

print("🎉 Color detection demo complete!")`
      }
    ]
  },
  {
    id: 'advanced-programming',
    title: 'Advanced Programming',
    description: 'Complex projects and algorithms',
    icon: '🧠',
    color: 'bg-indigo-500',
    lessons: [
      {
        id: 'loops-and-conditions',
        title: 'Loops and Conditions',
        description: 'Master programming logic with loops, conditions, and decision-making',
        duration: 40,
        difficulty: 'advanced',
        objectives: [
          'Understand and use if/else statements',
          'Create while and for loops',
          'Build autonomous robot behaviors'
        ],
        content: `# Loops and Conditions 🧠

Now let's make your robot smart! Loops and conditions let your robot make decisions and repeat actions automatically.

## Conditions - Making Decisions 🤔

Conditions let your robot choose what to do based on what it senses.

### Basic Concepts
- **IF statements**: Check if something is true
- **ELSE statements**: What to do if it's not true
- **ELIF statements**: Check multiple conditions

## Loops - Repeating Actions 🔄

Loops let your robot repeat actions automatically.

### Types of Loops
- **FOR loops**: Repeat a specific number of times
- **WHILE loops**: Keep going until a condition is met

## Smart Robot Behaviors 🤖

By combining sensors with conditions and loops, you can create robots that:
- Follow lines or walls
- Avoid obstacles
- Patrol areas automatically
- Respond to environmental changes

Ready to create intelligent robot behaviors? Let's make your robot think! 🚀🧠`,
        codeExample: `# Smart Robot Demo
from spike import PrimeHub, Motor, ColorSensor
import time

# Set up devices
hub = PrimeHub()
motor = Motor('A')
color_sensor = ColorSensor('B')

print("🤖 Smart Robot Starting!")

# Main behavior loop
for i in range(3):  # Repeat 3 times
    print(f"Cycle {i+1}/3")
    
    # Check what color we see
    color = color_sensor.get_color()
    print(f"I see: {color}")
    
    # Make decisions based on color
    if color == 'red':
        print("Red means STOP!")
        motor.stop()
        hub.light_matrix.show_image('NO')
    elif color == 'green':
        print("Green means GO!")
        motor.start(50)
        hub.light_matrix.show_image('YES')
        time.sleep(2)
        motor.stop()
    else:
        print("Unknown color - moving slowly")
        motor.start(25)
        time.sleep(1)
        motor.stop()
    
    time.sleep(1)

print("🎉 Smart behavior demo complete!")`
      }
    ]
  }
];

export const curriculum: Curriculum = {
  units
};
