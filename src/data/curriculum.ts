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
    id: 'python-fundamentals',
    title: 'Python Programming Fundamentals',
    description: 'Complete 4-week Python course for beginners with hands-on exercises',
    icon: '🐍',
    color: 'bg-purple-500',
    lessons: [
      // Week 1: Python Basics
      {
        id: 'python-week1-intro',
        title: 'Week 1: Getting Started with Python',
        description: 'Introduction to Python programming, variables, and basic data types',
        duration: 45,
        difficulty: 'beginner',
        type: 'coding',
        objectives: [
          'Understand what Python is and why we use it',
          'Learn about variables and how to store information',
          'Work with numbers, text, and basic math operations',
          'Use the print() function and get user input',
          'Write your first interactive Python programs'
        ],
        content: `# Welcome to Python Programming! 🐍

## What is Python?
Python is a programming language that's easy to learn and fun to use! It's named after a comedy group called "Monty Python" (not the snake!). Python is used to:
- Create websites and apps
- Control robots (like LEGO SPIKE Prime!)
- Analyze data and solve problems
- Create games and animations
- And much more!

## Your First Python Program
Let's start with the traditional "Hello, World!" program:

\`\`\`python
print("Hello, World!")
print("My name is Alex")
print("I'm learning Python!")
\`\`\`

The \`print()\` function displays text on the screen. Text must be inside quotes!

## Variables - Storing Information
Variables are like labeled boxes that store information:

\`\`\`python
# Storing text (strings)
name = "Alex"
favorite_color = "blue"
pet_name = "Fluffy"

# Storing numbers
age = 10
score = 95
temperature = 72

# Displaying variables
print("My name is", name)
print("I am", age, "years old")
print("My favorite color is", favorite_color)
\`\`\`

## Types of Data

### Strings (Text)
\`\`\`python
message = "Hello there!"
animal = "elephant"
sound = "trumpet"

# Combining strings
greeting = "Hello, " + name + "!"
print(greeting)
\`\`\`

### Numbers
\`\`\`python
# Whole numbers (integers)
cats = 3
dogs = 2
fish = 5

# Decimal numbers (floats)
height = 4.5
weight = 65.3

# Math with numbers
total_pets = cats + dogs + fish
print("Total pets:", total_pets)
\`\`\`

## Getting Input from Users
You can ask users to type information:

\`\`\`python
name = input("What's your name? ")
age = input("How old are you? ")

print("Nice to meet you,", name)
print("Wow, you're", age, "years old!")
\`\`\`

## Practice Time!
Try this example:

\`\`\`python
# Personal Introduction Program
name = input("What's your name? ")
age = input("How old are you? ")
hobby = input("What's your favorite hobby? ")

print("\\n=== About You ===")
print("Name:", name)
print("Age:", age)
print("Hobby:", hobby)
print("Nice to meet you,", name + "!")
\`\`\``,
        challengeDescription: 'Create a program that asks for personal information and creates a fun profile card.',
        challengeCode: `# Challenge: Create Your Digital Profile Card
print("🌟 Let's create your profile card! 🌟")

# TODO: Ask for the user's name
name = ""  # Fix this line

# TODO: Ask for their age  
age = ""   # Fix this line

# TODO: Ask for their favorite animal
animal = ""  # Fix this line

# TODO: Ask for their favorite color
color = ""   # Fix this line

# TODO: Display a nice profile card
print("\\n" + "="*30)
print("     YOUR PROFILE CARD")
print("="*30)
# Add more print statements to display the information nicely

print("You're awesome! 🎉")`
      },
      {
        id: 'python-week1-math',
        title: 'Week 1: Math and Problem Solving',
        description: 'Learn math operations and solve real-world problems with Python',
        duration: 45,
        difficulty: 'beginner',
        type: 'coding',
        objectives: [
          'Perform basic math operations (+, -, *, /)',
          'Understand order of operations',
          'Convert between different data types',
          'Solve real-world math problems with code'
        ],
        content: `# Math in Python 🔢

Python is excellent at math! Let's learn how to do calculations.

## Basic Math Operations
\`\`\`python
# Addition
result = 5 + 3  # result is 8

# Subtraction  
result = 10 - 4  # result is 6

# Multiplication
result = 6 * 7  # result is 42

# Division
result = 15 / 3  # result is 5.0

# Exponents (power)
result = 2 ** 3  # result is 8 (2 to the power of 3)

# Remainder (modulo)
result = 17 % 5  # result is 2
\`\`\`

## Order of Operations
Python follows math rules (PEMDAS):

\`\`\`python
# Without parentheses
result = 2 + 3 * 4  # result is 14 (not 20!)

# With parentheses
result = (2 + 3) * 4  # result is 20

# Complex example
result = (10 + 5) / 3 * 2  # result is 10.0
\`\`\`

## Converting Data Types
\`\`\`python
# Converting text to numbers
age_text = "10"
age_number = int(age_text)
print("Next year you'll be", age_number + 1)

# Converting numbers to text
score = 95
message = "Your score is " + str(score)
print(message)
\`\`\`

## Problem Solving: Pizza Party Calculator
\`\`\`python
print("🍕 Pizza Party Calculator 🍕")

people = int(input("How many people? "))
slices_per_person = int(input("Slices per person? "))
slices_per_pizza = 8

total_slices = people * slices_per_person
pizzas_needed = total_slices / slices_per_pizza

print("\\nResults:")
print("Total slices needed:", total_slices)
print("Pizzas needed:", pizzas_needed)

# Round up to whole pizzas
import math
pizzas_to_order = math.ceil(pizzas_needed)
print("Pizzas to order:", pizzas_to_order)
\`\`\``,
        challengeDescription: 'Create a calculator for planning a birthday party with snacks and costs.',
        challengeCode: `# Challenge: Birthday Party Planner
print("🎉 Birthday Party Planner 🎂")

# Get party information
guests = int(input("How many guests are coming? "))
cake_cost = float(input("How much does the cake cost? $"))
decoration_cost = float(input("How much for decorations? $"))

# Calculate per-person costs
balloons_per_person = 3
balloon_cost = 0.50  # 50 cents per balloon

# TODO: Calculate total balloon cost
total_balloon_cost = 0  # Fix this calculation

# TODO: Calculate total party cost
total_cost = 0  # Fix this calculation

# TODO: Calculate cost per person
cost_per_person = 0  # Fix this calculation

print("\\n🎈 Party Planning Results:")
print("Guests:", guests)
print("Total balloons needed:", guests * balloons_per_person)
# Add more print statements to show all the costs

print("Have a great party! 🎉")`
      },
      // Week 2: Control Flow
      {
        id: 'python-week2-decisions',
        title: 'Week 2: Making Decisions with If Statements',
        description: 'Learn how to make programs that can make decisions and respond differently',
        duration: 50,
        difficulty: 'beginner',
        type: 'coding',
        objectives: [
          'Understand boolean logic (True/False)',
          'Use if, elif, and else statements',
          'Compare values with comparison operators',
          'Create programs that make smart decisions'
        ],
        content: `# Making Decisions in Python 🤔

## Boolean Logic
Computers make decisions based on True or False (called **booleans**).

### Comparison Operators
\`\`\`python
# Equal to
5 == 5    # True
3 == 7    # False

# Not equal
5 != 3    # True
4 != 4    # False

# Greater than / Less than
7 > 3     # True
2 < 8     # True
5 >= 5    # True (greater than or equal)
3 <= 7    # True (less than or equal)
\`\`\`

## If Statements
\`\`\`python
age = 10

if age >= 10:
    print("You can ride the roller coaster!")
    
if age < 5:
    print("You get in free!")
\`\`\`

## If-Else Statements
\`\`\`python
temperature = 75

if temperature > 80:
    print("It's hot! Wear shorts.")
else:
    print("It's cool. Bring a jacket.")
\`\`\`

## If-Elif-Else Statements
\`\`\`python
score = 85

if score >= 90:
    print("Amazing! You got an A!")
elif score >= 80:
    print("Great job! You got a B!")
elif score >= 70:
    print("Good work! You got a C!")
else:
    print("Keep practicing!")
\`\`\`

## Combining Conditions
\`\`\`python
age = 12
height = 48  # inches

# AND - both conditions must be true
if age >= 10 and height >= 42:
    print("You can ride the big roller coaster!")

# OR - either condition can be true
if age < 5 or height < 36:
    print("You need adult supervision.")
\`\`\`

## Real Example: Number Guessing Game
\`\`\`python
import random

secret_number = random.randint(1, 10)
guess = int(input("Guess a number between 1 and 10: "))

if guess == secret_number:
    print("🎉 Amazing! You guessed it!")
elif guess < secret_number:
    print("📈 Too low! The number was", secret_number)
else:
    print("📉 Too high! The number was", secret_number)
\`\`\``,
        challengeDescription: 'Create a fun quiz game that gives different responses based on answers.',
        challengeCode: `# Challenge: Animal Quiz Game
print("🐾 Welcome to the Animal Quiz! 🐾")

print("I'm thinking of an animal...")
print("1. It has stripes")
print("2. It's black and white") 
print("3. It lives in Africa")

guess = input("What animal am I thinking of? ").lower()

# TODO: Add if statements to check the answer
# The correct answer is "zebra"
# Give different responses for close answers like "horse" or "donkey"
# Give encouragement for any attempt!

print("Thanks for playing! 🎮")`
      },
      {
        id: 'python-week2-loops',
        title: 'Week 2: Loops - Repeating Actions',
        description: 'Learn how to make programs repeat actions automatically',
        duration: 50,
        difficulty: 'beginner',
        type: 'coding',
        objectives: [
          'Understand why loops are useful',
          'Use for loops to repeat actions',
          'Use while loops for conditional repetition',
          'Create patterns and solve problems with loops'
        ],
        content: `# Loops in Python 🔄

## Why Use Loops?
Instead of writing the same code over and over, we can use loops!

### Without Loops (tedious):
\`\`\`python
print("🌟")
print("🌟")
print("🌟")
print("🌟")
print("🌟")
\`\`\`

### With Loops (smart):
\`\`\`python
for i in range(5):
    print("🌟")
\`\`\`

## For Loops - Repeat a Specific Number of Times
\`\`\`python
# Count from 0 to 4
for i in range(5):
    print("Count:", i)

# Count from 1 to 10
for i in range(1, 11):
    print("Number:", i)

# Count by 2s
for i in range(0, 11, 2):
    print("Even number:", i)
\`\`\`

## Loop Through Lists
\`\`\`python
animals = ["cat", "dog", "bird", "fish"]

for animal in animals:
    print("I love my", animal)

colors = ["red", "blue", "green", "yellow"]
for color in colors:
    print("🎨", color.upper())
\`\`\`

## While Loops - Repeat While Something is True
\`\`\`python
countdown = 5

while countdown > 0:
    print("Countdown:", countdown)
    countdown = countdown - 1

print("🚀 Blast off!")
\`\`\`

## Fun Patterns with Loops
\`\`\`python
# Triangle pattern
for i in range(1, 6):
    stars = "⭐" * i
    print(stars)

# Multiplication table
number = 5
for i in range(1, 11):
    result = number * i
    print(f"{number} x {i} = {result}")
\`\`\`

## Interactive Example: Password Checker
\`\`\`python
correct_password = "python123"
attempts = 0
max_attempts = 3

while attempts < max_attempts:
    password = input("Enter password: ")
    
    if password == correct_password:
        print("🔓 Access granted!")
        break
    else:
        attempts += 1
        remaining = max_attempts - attempts
        if remaining > 0:
            print(f"❌ Wrong! {remaining} attempts left.")
        else:
            print("🔒 Access denied!")
\`\`\``,
        challengeDescription: 'Create a program that draws ASCII art patterns using loops.',
        challengeCode: `# Challenge: ASCII Art Generator
print("🎨 ASCII Art Generator 🎨")

# TODO: Ask the user what size triangle they want (1-10)
size = 5  # Change this to get input from user

print("\\nDrawing a triangle:")
# TODO: Use a for loop to draw a triangle
# Each row should have 1 more star than the previous
# Row 1: *
# Row 2: **  
# Row 3: ***
# etc.

print("\\nDrawing a square:")
# TODO: Use nested loops to draw a square
# The square should be 'size' x 'size'

print("\\nDrawing a countdown:")
# TODO: Use a while loop to count down from 'size' to 1
# Then print "🎉 Happy New Year!"

print("Great job creating art with code! 🌟")`
      },
      // Week 3: Functions and Lists
      {
        id: 'python-week3-functions',
        title: 'Week 3: Functions - Organizing Your Code',
        description: 'Learn how to create reusable functions to organize and simplify your code',
        duration: 50,
        difficulty: 'intermediate',
        type: 'coding',
        objectives: [
          'Understand what functions are and why they are useful',
          'Create functions that take parameters',
          'Return values from functions',
          'Organize code into logical, reusable pieces'
        ],
        content: `# Functions in Python 🔧

## What Are Functions?
Functions are like recipes - they contain instructions that you can use over and over!

## Basic Functions
\`\`\`python
def say_hello():
    print("Hello there!")
    print("Welcome to Python!")

# Call the function
say_hello()
\`\`\`

## Functions with Parameters
\`\`\`python
def greet_person(name):
    print(f"Hello, {name}!")
    print("Nice to meet you!")

# Call with different names
greet_person("Alex")
greet_person("Sam")
greet_person("Jordan")
\`\`\`

## Functions with Multiple Parameters
\`\`\`python
def calculate_area(length, width):
    area = length * width
    print(f"The area is {area} square units")

calculate_area(5, 3)
calculate_area(10, 7)
\`\`\`

## Functions that Return Values
\`\`\`python
def add_numbers(a, b):
    result = a + b
    return result

# Use the returned value
sum1 = add_numbers(5, 3)
sum2 = add_numbers(10, 15)
print("First sum:", sum1)
print("Second sum:", sum2)
\`\`\`

## Real Example: Temperature Converter
\`\`\`python
def celsius_to_fahrenheit(celsius):
    fahrenheit = (celsius * 9/5) + 32
    return fahrenheit

def fahrenheit_to_celsius(fahrenheit):
    celsius = (fahrenheit - 32) * 5/9
    return celsius

# Test the functions
temp_c = 25
temp_f = celsius_to_fahrenheit(temp_c)
print(f"{temp_c}°C = {temp_f}°F")

temp_f = 77
temp_c = fahrenheit_to_celsius(temp_f)
print(f"{temp_f}°F = {temp_c}°C")
\`\`\`

## Functions with Default Parameters
\`\`\`python
def create_greeting(name, greeting="Hello"):
    return f"{greeting}, {name}!"

print(create_greeting("Alex"))  # Uses default "Hello"
print(create_greeting("Sam", "Hi"))  # Uses "Hi"
\`\`\`

## Organizing Code with Functions
\`\`\`python
def get_user_info():
    name = input("What's your name? ")
    age = int(input("How old are you? "))
    return name, age

def calculate_birth_year(age):
    import datetime
    current_year = datetime.datetime.now().year
    birth_year = current_year - age
    return birth_year

def display_info(name, birth_year):
    print(f"\\n🎂 {name}, you were born in {birth_year}!")

# Main program
name, age = get_user_info()
birth_year = calculate_birth_year(age)
display_info(name, birth_year)
\`\`\``,
        challengeDescription: 'Create a calculator program using functions for each operation.',
        challengeCode: `# Challenge: Function Calculator
print("🧮 Function Calculator 🧮")

def add(a, b):
    # TODO: Return the sum of a and b
    pass

def subtract(a, b):
    # TODO: Return a minus b
    pass

def multiply(a, b):
    # TODO: Return a times b
    pass

def divide(a, b):
    # TODO: Return a divided by b (watch out for dividing by zero!)
    pass

def get_numbers():
    # TODO: Ask user for two numbers and return them
    pass

def show_menu():
    print("\\nChoose an operation:")
    print("1. Add")
    print("2. Subtract") 
    print("3. Multiply")
    print("4. Divide")

# TODO: Create a main program that:
# 1. Shows the menu
# 2. Gets the user's choice
# 3. Gets two numbers
# 4. Calls the appropriate function
# 5. Shows the result

print("Thanks for using the calculator! 🎉")`
      },
      {
        id: 'python-week3-lists',
        title: 'Week 3: Lists - Storing Multiple Items',
        description: 'Learn how to work with lists to store and manipulate collections of data',
        duration: 50,
        difficulty: 'intermediate',
        type: 'coding',
        objectives: [
          'Create and manipulate lists',
          'Access and modify list items',
          'Use list methods to add, remove, and organize items',
          'Loop through lists to process data'
        ],
        content: `# Lists in Python 📝

## What Are Lists?
Lists are like shopping lists - they can hold multiple items in order.

## Creating Lists
\`\`\`python
# Empty list
shopping_list = []

# List with items
fruits = ["apple", "banana", "orange", "grape"]
numbers = [1, 2, 3, 4, 5]
mixed = ["hello", 42, True, 3.14]

print("Fruits:", fruits)
\`\`\`

## Accessing List Items
\`\`\`python
animals = ["cat", "dog", "bird", "fish"]

# First item (index 0)
print("First animal:", animals[0])

# Last item
print("Last animal:", animals[-1])

# Second item
print("Second animal:", animals[1])
\`\`\`

## Modifying Lists
\`\`\`python
colors = ["red", "blue", "green"]

# Change an item
colors[1] = "purple"
print("Modified colors:", colors)

# Add items
colors.append("yellow")  # Add to end
colors.insert(1, "orange")  # Insert at position 1
print("After adding:", colors)

# Remove items
colors.remove("red")  # Remove by value
last_color = colors.pop()  # Remove and return last item
print("After removing:", colors)
print("Removed color:", last_color)
\`\`\`

## List Methods
\`\`\`python
numbers = [3, 1, 4, 1, 5, 9, 2, 6]

# Length of list
print("Length:", len(numbers))

# Sort the list
numbers.sort()
print("Sorted:", numbers)

# Count occurrences
count_1 = numbers.count(1)
print("Number of 1s:", count_1)

# Find index of item
index = numbers.index(5)
print("Index of 5:", index)
\`\`\`

## Looping Through Lists
\`\`\`python
hobbies = ["reading", "gaming", "sports", "music"]

# Loop through items
for hobby in hobbies:
    print("I enjoy", hobby)

# Loop with index
for i in range(len(hobbies)):
    print(f"{i+1}. {hobbies[i]}")

# Loop with enumerate
for index, hobby in enumerate(hobbies):
    print(f"#{index+1}: {hobby}")
\`\`\`

## List Slicing
\`\`\`python
letters = ["a", "b", "c", "d", "e", "f"]

# Get first 3 items
first_three = letters[0:3]  # or letters[:3]
print("First three:", first_three)

# Get last 2 items
last_two = letters[-2:]
print("Last two:", last_two)

# Get middle items
middle = letters[2:4]
print("Middle:", middle)
\`\`\`

## Real Example: Grade Manager
\`\`\`python
def add_grade(grades, new_grade):
    grades.append(new_grade)
    print(f"Added grade: {new_grade}")

def calculate_average(grades):
    if len(grades) == 0:
        return 0
    total = sum(grades)
    average = total / len(grades)
    return average

def show_grades(grades):
    print("\\nYour grades:")
    for i, grade in enumerate(grades):
        print(f"  {i+1}. {grade}")
    
    avg = calculate_average(grades)
    print(f"Average: {avg:.1f}")

# Example usage
student_grades = []
add_grade(student_grades, 85)
add_grade(student_grades, 92)
add_grade(student_grades, 78)
show_grades(student_grades)
\`\`\``,
        challengeDescription: 'Create a to-do list manager with functions to add, remove, and display tasks.',
        challengeCode: `# Challenge: To-Do List Manager
print("📝 To-Do List Manager 📝")

# Start with an empty to-do list
todo_list = []

def add_task(task_list, task):
    # TODO: Add the task to the list
    # TODO: Print a confirmation message
    pass

def remove_task(task_list, task_number):
    # TODO: Remove the task at the given position (remember: lists start at 0!)
    # TODO: Handle the case where the number is invalid
    pass

def show_tasks(task_list):
    # TODO: Display all tasks with numbers
    # TODO: If list is empty, show a friendly message
    pass

def count_tasks(task_list):
    # TODO: Return the number of tasks
    pass

# TODO: Create a simple menu system:
# 1. Add task
# 2. Remove task  
# 3. Show tasks
# 4. Quit

# Test your functions:
add_task(todo_list, "Walk the dog")
add_task(todo_list, "Do homework")
add_task(todo_list, "Play games")
show_tasks(todo_list)

print("Great job managing your tasks! ✅")`
      },
      // Week 4: Projects and Games
      {
        id: 'python-week4-projects',
        title: 'Week 4: Building Your First Games',
        description: 'Put everything together to create fun interactive games and projects',
        duration: 60,
        difficulty: 'intermediate',
        type: 'project',
        objectives: [
          'Combine all Python concepts learned so far',
          'Create interactive text-based games',
          'Practice problem-solving and debugging',
          'Build confidence in programming abilities'
        ],
        content: `# Building Games in Python 🎮

## Text Adventure Game Framework
Let's build an exciting adventure game using everything we've learned!

\`\`\`python
import random

def display_intro():
    print("🏰 Welcome to the Magic Castle Adventure! 🏰")
    print("You are standing in front of a mysterious castle.")
    print("There are three doors: Red, Blue, and Green.")
    print()

def get_player_choice():
    choice = input("Which door do you choose? (red/blue/green): ").lower()
    return choice

def red_door_adventure():
    print("\\n🔴 You enter the Red Door...")
    print("You find a room full of treasure! 💎")
    
    action = input("Do you take the treasure? (yes/no): ").lower()
    if action == "yes":
        print("🎉 You win! But the treasure was cursed!")
        print("You turn into a frog! 🐸")
        return "frog_ending"
    else:
        print("😇 You are honest! The castle rewards you!")
        print("You find the real treasure in the next room! 💰")
        return "honest_ending"

def blue_door_adventure():
    print("\\n🔵 You enter the Blue Door...")
    print("You meet a friendly wizard! 🧙‍♂️")
    
    riddle_answer = input("Wizard asks: 'What has keys but no locks?' ").lower()
    if "piano" in riddle_answer or "keyboard" in riddle_answer:
        print("🎼 Correct! The wizard gives you magical powers!")
        return "wizard_ending"
    else:
        print("🤔 Not quite right, but the wizard likes your effort!")
        print("He gives you a magic cookie instead! 🍪")
        return "cookie_ending"

def green_door_adventure():
    print("\\n🟢 You enter the Green Door...")
    print("You fall into a pit with a friendly dragon! 🐉")
    
    number = random.randint(1, 3)
    guess = int(input("Dragon says: 'Guess my number (1-3) to escape!': "))
    
    if guess == number:
        print(f"🎯 Correct! The number was {number}!")
        print("The dragon flies you out of the castle! 🕊️")
        return "dragon_ending"
    else:
        print(f"❌ Wrong! The number was {number}.")
        print("Don't worry, the dragon is friendly and helps you escape anyway! 😊")
        return "friendly_ending"

def main_game():
    display_intro()
    
    choice = get_player_choice()
    
    if choice == "red":
        ending = red_door_adventure()
    elif choice == "blue":
        ending = blue_door_adventure()
    elif choice == "green":
        ending = green_door_adventure()
    else:
        print("That's not a valid choice! The castle vanishes! 👻")
        ending = "vanish_ending"
    
    print(f"\\n🎭 You got the '{ending}' ending!")
    print("Thanks for playing! 🎮")

# Run the game
main_game()
\`\`\`

## Number Guessing Game with Lives
\`\`\`python
import random

def play_guessing_game():
    print("🎲 Number Guessing Game 🎲")
    print("I'm thinking of a number between 1 and 20!")
    
    secret_number = random.randint(1, 20)
    lives = 5
    guesses = []
    
    while lives > 0:
        print(f"\\nLives remaining: ❤️ {lives}")
        print(f"Previous guesses: {guesses}")
        
        try:
            guess = int(input("Enter your guess: "))
        except ValueError:
            print("Please enter a valid number!")
            continue
            
        guesses.append(guess)
        
        if guess == secret_number:
            print(f"🎉 Congratulations! You guessed {secret_number}!")
            print(f"It took you {len(guesses)} guesses!")
            return True
        elif guess < secret_number:
            print("📈 Too low!")
        else:
            print("📉 Too high!")
            
        lives -= 1
    
    print(f"💀 Game Over! The number was {secret_number}")
    return False

# Play multiple rounds
wins = 0
games = 0

while True:
    games += 1
    print(f"\\n🎯 Game #{games}")
    
    if play_guessing_game():
        wins += 1
    
    play_again = input("\\nPlay again? (yes/no): ").lower()
    if play_again != "yes":
        break

print(f"\\n📊 Final Score: {wins} wins out of {games} games!")
print("Thanks for playing! 👋")
\`\`\`

## Rock Paper Scissors Tournament
\`\`\`python
import random

def get_computer_choice():
    choices = ["rock", "paper", "scissors"]
    return random.choice(choices)

def determine_winner(player, computer):
    if player == computer:
        return "tie"
    elif (player == "rock" and computer == "scissors") or \\
         (player == "paper" and computer == "rock") or \\
         (player == "scissors" and computer == "paper"):
        return "player"
    else:
        return "computer"

def play_round():
    print("\\n🥊 Round Start!")
    player = input("Choose rock, paper, or scissors: ").lower()
    
    if player not in ["rock", "paper", "scissors"]:
        print("Invalid choice! You forfeit this round.")
        return "computer"
    
    computer = get_computer_choice()
    print(f"You chose: {player}")
    print(f"Computer chose: {computer}")
    
    winner = determine_winner(player, computer)
    
    if winner == "tie":
        print("🤝 It's a tie!")
    elif winner == "player":
        print("🎉 You win this round!")
    else:
        print("🤖 Computer wins this round!")
    
    return winner

def play_tournament():
    print("🏆 Rock Paper Scissors Tournament! 🏆")
    print("First to 3 wins is the champion!")
    
    player_score = 0
    computer_score = 0
    round_number = 0
    
    while player_score < 3 and computer_score < 3:
        round_number += 1
        print(f"\\n--- Round {round_number} ---")
        print(f"Score: You {player_score} - {computer_score} Computer")
        
        result = play_round()
        
        if result == "player":
            player_score += 1
        elif result == "computer":
            computer_score += 1
    
    print("\\n🎊 TOURNAMENT OVER! 🎊")
    if player_score == 3:
        print("🥇 You are the champion!")
    else:
        print("🥈 Computer is the champion! Better luck next time!")
    
    print(f"Final Score: You {player_score} - {computer_score} Computer")

play_tournament()
\`\`\``,
        challengeDescription: 'Create your own unique text-based adventure game with multiple paths and endings.',
        challengeCode: `# Challenge: Create Your Own Adventure Game!
print("🎮 Adventure Game Creator 🎮")

# TODO: Create your own adventure game using these guidelines:

# 1. STORY SETUP
# - Create an interesting setting (space station, underwater city, time machine, etc.)
# - Give the player a clear goal
# - Create at least 3 different paths/choices

# 2. REQUIRED FEATURES
# - Use functions to organize different parts of your game
# - Include at least one random element (dice roll, random encounter, etc.)
# - Have at least 3 different possible endings
# - Include at least one mini-game or puzzle

# 3. EXAMPLE STRUCTURE
def game_intro():
    # TODO: Write your story introduction
    pass

def path_one():
    # TODO: Create first adventure path
    pass

def path_two():
    # TODO: Create second adventure path  
    pass

def path_three():
    # TODO: Create third adventure path
    pass

def mini_game():
    # TODO: Create a simple game (math puzzle, riddle, etc.)
    pass

def main_game():
    # TODO: Connect all your functions together
    pass

# BONUS CHALLENGES:
# - Keep track of player inventory or health points
# - Allow the player to enter their name and use it throughout
# - Create a scoring system
# - Add ASCII art for different scenes
# - Include multiple mini-games

print("Remember: Be creative and have fun!")
print("Test each feature as you build it!")
print("Most importantly: Make it YOUR story! ✨")

# Your adventure game code starts here...`
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
