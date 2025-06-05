'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, FileCode, Zap, Play, RotateCcw } from 'lucide-react';
import { useState } from 'react';
import PythonEditor from '@/components/PythonEditor';

const exampleCodes = [
  {
    title: 'Hello World',
    description: 'Your first LEGO SPIKE Prime program',
    code: `from spike import PrimeHub
import time

# Initialize the hub
hub = PrimeHub()

# Say hello!
print("Hello LEGO SPIKE Prime!")
hub.light_matrix.show_image('HAPPY')
hub.speaker.beep(60, 0.5)

time.sleep(2)
hub.light_matrix.show_image('HEART')`
  },
  {
    title: 'Motor Control',
    description: 'Basic motor movement',
    code: `from spike import Motor
import time

# Create motor on port A
motor = Motor('A')

print("Starting motor movement...")

# Rotate motor forward
motor.run_for_seconds(2, 50)
time.sleep(0.5)

# Rotate motor backward
motor.run_for_seconds(2, -50)

print("Motor movement complete!")`
  },
  {
    title: 'Distance Sensor',
    description: 'Read distance measurements',
    code: `from spike import DistanceSensor, PrimeHub
import time

# Initialize components
sensor = DistanceSensor('1')
hub = PrimeHub()

print("Distance sensor active!")

# Read distance 10 times
for i in range(10):
    distance = sensor.get_distance_cm()
    if distance is not None:
        print(f"Distance: {distance} cm")
        
        # Show different images based on distance
        if distance < 10:
            hub.light_matrix.show_image('CONFUSED')
        elif distance < 30:
            hub.light_matrix.show_image('HAPPY')
        else:
            hub.light_matrix.show_image('HEART')
    
    time.sleep(1)
    
print("Sensor reading complete!")`
  },
  {
    title: 'Light Show',
    description: 'Fun lights and sounds program',
    code: `from spike import PrimeHub
import time

hub = PrimeHub()

# Fun light show sequence
images = ['HEART', 'YES', 'HAPPY', 'SURPRISED', 'SILLY', 'FABULOUS']
colors = ['red', 'yellow', 'green', 'blue', 'violet', 'cyan']

print("Starting LEGO light show! 🎉")

for i in range(len(images)):
    # Show image
    hub.light_matrix.show_image(images[i])
    
    # Set status light color
    hub.status_light.on(colors[i])
    
    # Play a beep
    hub.speaker.beep(60 + i * 10, 0.5)
    
    print(f"Step {i+1}: {images[i]} with {colors[i]} light")
    time.sleep(1)

hub.light_matrix.off()
hub.status_light.off()
print("Light show complete! ✨")`
  },
  {
    title: 'Simple Robot Walker',
    description: 'Make your robot walk forward',
    code: `from spike import MotorPair, PrimeHub
import time

# Initialize components
motors = MotorPair('A', 'B')  # Left motor on A, right motor on B
hub = PrimeHub()

print("Robot walker starting! 🤖")
hub.light_matrix.show_image('ARROW')

# Walk forward for 3 seconds
motors.start(50)  # 50% speed
time.sleep(3)
motors.stop()

# Turn right
motors.start_tank(30, -30)  # Left motor forward, right motor backward
time.sleep(1)
motors.stop()

# Walk forward again
motors.start(50)
time.sleep(2)
motors.stop()

hub.light_matrix.show_image('HAPPY')
hub.speaker.beep(70, 1)
print("Walking complete! Great job! 🎉")`
  },
  {
    title: 'Color Party',
    description: 'Change colors based on what you see',
    code: `from spike import ColorSensor, PrimeHub
import time

# Initialize components
color_sensor = ColorSensor('3')
hub = PrimeHub()

print("Color party starting! Place objects near the sensor! 🌈")

# Color detection loop
for i in range(20):  # Check colors 20 times
    color = color_sensor.get_color()
    
    if color == 'red':
        hub.status_light.on('red')
        hub.light_matrix.show_image('HEART')
        hub.speaker.beep(60, 0.3)
        print("❤️ Red detected!")
        
    elif color == 'blue':
        hub.status_light.on('blue')
        hub.light_matrix.show_image('HAPPY')
        hub.speaker.beep(70, 0.3)
        print("💙 Blue detected!")
        
    elif color == 'yellow':
        hub.status_light.on('yellow')
        hub.light_matrix.show_image('SURPRISED')
        hub.speaker.beep(80, 0.3)
        print("💛 Yellow detected!")
        
    elif color == 'green':
        hub.status_light.on('green')
        hub.light_matrix.show_image('YES')
        hub.speaker.beep(90, 0.3)
        print("💚 Green detected!")
        
    else:
        hub.status_light.on('white')
        hub.light_matrix.show_image('CONFUSED')
        print(f"🤔 Unknown color: {color}")
    
    time.sleep(0.5)

hub.light_matrix.off()
hub.status_light.off()
print("Color party complete! 🎉")`
  }
];

export default function PlaygroundPage() {
  const [code, setCode] = useState(exampleCodes[0].code);
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [selectedExample, setSelectedExample] = useState(0);

  const handleRunCode = () => {
    setIsRunning(true);
    setOutput('🚀 Running your code...\n');
    
    // Simulate code execution with different outputs
    setTimeout(() => {
      const outputs = [
        '✅ Code executed successfully!\n📡 Sending commands to LEGO SPIKE Prime...\n💡 Hub light matrix updated!\n🔊 Speaker played sound!\n🎉 Program completed!',
        '✅ Code executed successfully!\n🔧 Motor connected to port A\n🔄 Motor rotating forward...\n🔄 Motor rotating backward...\n🎉 Motor movement complete!',
        '✅ Code executed successfully!\n📏 Distance sensor ready on port C\n📊 Reading distance measurements...\n📍 Distance readings completed!\n🎉 Sensor data collected!'
      ];
      
      setOutput(outputs[Math.floor(Math.random() * outputs.length)]);
      setIsRunning(false);
    }, 2000);
  };

  const handleResetCode = () => {
    setCode(exampleCodes[selectedExample].code);
    setOutput('');
  };

  const handleLoadExample = (index: number) => {
    setSelectedExample(index);
    setCode(exampleCodes[index].code);
    setOutput('');
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link 
            href="/"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-red-500 transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-8"
          >
            <div className="flex justify-center items-center gap-3 mb-4">
              <Zap className="w-12 h-12 text-yellow-500" />
              <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-yellow-500 via-red-500 to-blue-500 bg-clip-text text-transparent">
                Python Playground
              </h1>
            </div>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Try out LEGO SPIKE Prime Python code! Experiment with motors, sensors, and the hub in a safe environment.
            </p>
          </motion.div>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Examples Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-4"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-4">📚 Example Programs</h2>
            {exampleCodes.map((example, index) => (
              <button
                key={index}
                onClick={() => handleLoadExample(index)}
                className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 ${
                  selectedExample === index
                    ? 'border-red-400 bg-red-50'
                    : 'border-gray-200 bg-white hover:border-red-200 hover:bg-red-25'
                }`}
              >
                <h3 className="font-bold text-gray-800 mb-2">{example.title}</h3>
                <p className="text-sm text-gray-600">{example.description}</p>
              </button>
            ))}
            
            <div className="bg-blue-50 rounded-xl p-4 border-l-4 border-blue-400 mt-6">
              <h3 className="font-bold text-gray-800 mb-2">💡 Tips</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Try modifying the example code</li>
                <li>• Change motor speeds and directions</li>
                <li>• Experiment with different images</li>
                <li>• Add your own print statements</li>
              </ul>
            </div>
          </motion.div>

          {/* Editor and Output */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Python Editor */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="bg-gray-800 text-white px-6 py-4 flex items-center justify-between">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <FileCode className="w-5 h-5" />
                  Python Editor
                </h2>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCode('')}
                    className="bg-gray-600 hover:bg-gray-500 px-3 py-1 rounded text-sm transition-colors"
                  >
                    Clear
                  </button>
                  <button
                    onClick={handleResetCode}
                    className="bg-gray-600 hover:bg-gray-500 px-3 py-1 rounded text-sm flex items-center gap-1 transition-colors"
                  >
                    <RotateCcw className="w-4 h-4" />
                    Reset
                  </button>
                  <button
                    onClick={handleRunCode}
                    disabled={isRunning}
                    className="bg-green-600 hover:bg-green-500 disabled:bg-gray-500 px-4 py-1 rounded text-sm flex items-center gap-1 transition-colors"
                  >
                    <Play className="w-4 h-4" />
                    {isRunning ? 'Running...' : 'Run Code'}
                  </button>
                </div>
              </div>
              
              <PythonEditor
                value={code}
                onChange={setCode}
                height="500px"
              />
            </div>

            {/* Output Console */}
            <div className="bg-gray-900 text-green-400 rounded-xl shadow-lg overflow-hidden">
              <div className="bg-gray-800 text-white px-6 py-3 flex items-center justify-between">
                <h3 className="font-bold">📟 Console Output</h3>
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${isRunning ? 'bg-yellow-400 animate-pulse' : 'bg-green-400'}`}></div>
                  <span className="text-sm">{isRunning ? 'Running' : 'Ready'}</span>
                </div>
              </div>
              <div className="p-4 font-mono text-sm min-h-[200px]">
                <pre className="whitespace-pre-wrap">
                  {output || '# Click "Run Code" to execute your Python program\n# The simulated output will appear here...\n\n# 🚀 Ready to program your LEGO SPIKE Prime!'}
                </pre>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid md:grid-cols-2 gap-4">
              <Link 
                href="/units"
                className="bg-gradient-to-r from-red-500 to-yellow-500 text-white p-4 rounded-xl font-bold text-center hover:shadow-lg transform hover:scale-105 transition-all duration-200"
              >
                📖 Learn with Lessons
              </Link>
              <button
                onClick={() => {
                  setCode('# Write your own LEGO SPIKE Prime program here!\nfrom spike import PrimeHub\n\nhub = PrimeHub()\nprint("Hello from my custom program!")\nhub.light_matrix.show_image("HEART")');
                  setOutput('');
                }}
                className="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-4 rounded-xl font-bold text-center hover:shadow-lg transform hover:scale-105 transition-all duration-200"
              >
                ✨ Start Fresh Program
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
