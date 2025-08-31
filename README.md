# 🎯 LEGO Vibe - Learn Python Programming with LEGO SPIKE Prime

A fun, interactive learning website designed to teach 10-year-old kids Python programming using LEGO SPIKE Prime robots. Built with educational content from PrimeLessons.org and enhanced with official FIRST LEGO League (FLL) Team Meeting Guide methodology.

## 🚀 Features

- **6 Comprehensive Learning Units**: From basic concepts to advanced robot programming
- **Interactive Python Editor**: Built-in Monaco Editor with LEGO SPIKE Prime syntax highlighting
- **Official FLL Integration**: Training Camp methodology and Coopertition® principles
- **Team Meetings Management**: 24-session structured learning program aligned with FLL guidelines
- **Kid-Friendly Design**: Bright, colorful interface designed specifically for children
- **Hands-On Learning**: Real code examples and challenges for LEGO SPIKE Prime
- **Progress Tracking**: Visual progress indicators and achievements
- **Meeting Notes & Documentation**: Session tracking with Engineering Notebook practices
- **Responsive Design**: Works on tablets, desktops, and mobile devices
- **Azure Deployment**: Cloud-hosted for reliable access

## 📚 Learning Curriculum

### Unit 1: Overview
Introduction to LEGO SPIKE Prime and programming concepts

### Unit 2: Introduction to Software and Hub
Getting familiar with the LEGO SPIKE app and hub functionality

### Unit 3: Introduction to Python
Basic Python programming concepts and syntax

### Unit 4: Movement
Programming motors and creating robot movement

### Unit 5: Sensors and Outputs
Working with sensors, lights, sounds, and displays

### Unit 6: Advanced Programming
Complex projects, algorithms, and real-world applications

## 🏆 FLL Team Meeting Structure

### Training Camp (Sessions 1-3)
- **Session 1**: Team Building & Robot Introduction
- **Session 2**: Basic Programming & My Blocks
- **Session 3**: Sensors & Problem Solving

### Project Development (Sessions 4-12)
- Project Sparks methodology
- Research and innovation planning
- Coopertition® and Gracious Professionalism®
- Engineering Notebook documentation

### Competition Preparation (Sessions 13-24)
- Advanced programming techniques
- Robot missions and challenges
- Presentation skills
- Team collaboration and strategy

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Code Editor**: Monaco Editor
- **Animation**: Framer Motion
- **Icons**: Lucide React
- **Database**: PostgreSQL with Azure integration
- **Deployment**: Azure Container Apps
- **Infrastructure**: Bicep templates

## 🏁 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- LEGO SPIKE Prime Kit (for physical robot programming)

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/rajesh-ms/lego-spike-vibe.git
   cd lego-spike-vibe
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser** and navigate to [http://localhost:3000](http://localhost:3000)

### Azure Deployment

This project is configured for Azure deployment using Azure Developer CLI (azd):

```bash
# Initialize Azure resources
azd up

# Deploy updates
azd deploy
```

**Live Demo**: [https://ca-y6flufy3trxks.purpletree-5db0b0e0.eastus2.azurecontainerapps.io/](https://ca-y6flufy3trxks.purpletree-5db0b0e0.eastus2.azurecontainerapps.io/)

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🎨 Design Guidelines

- **Target Audience**: 10-year-old children
- **Color Scheme**: Bright LEGO-themed colors (red, yellow, blue, green)
- **Typography**: Clear, readable fonts with appropriate sizing
- **Navigation**: Simple and intuitive interface
- **Accessibility**: WCAG compliant with keyboard navigation support

## 📱 Pages Structure

```
/                     # Homepage with course overview
/units               # Learning units listing
/units/[unitId]      # Individual unit pages
/units/[unitId]/lessons/[lessonId]  # Lesson pages with Python editor
/meetings            # FLL team meetings management
/playground          # Free-form Python coding environment
/progress            # Learning progress tracking
```

## 🧩 Components

- **Navigation**: Site-wide navigation with progress indicators
- **PythonEditor**: Monaco-based code editor with LEGO SPIKE Prime support
- **CreateMeetingModal**: Interface for scheduling FLL team meetings
- **SessionNotesModal**: Documentation system for meeting notes
- **LearningEntryModal**: Progress tracking and reflection tools
- **AchievementSystem**: Gamified learning progress
- **Footer**: Site footer with links and information

## 🎯 Learning Objectives

Students will learn to:

- Understand basic programming concepts
- Write Python code for LEGO SPIKE Prime
- Control motors, sensors, and hub functions
- Create interactive robot behaviors
- Solve problems through programming
- Build confidence in STEM subjects
- Experience FLL team collaboration
- Practice Engineering Notebook documentation
- Apply Gracious Professionalism® principles
- Develop presentation and communication skills

## 🏅 FLL Integration

This platform incorporates official FIRST LEGO League educational methodology:

- **Training Camp Structure**: Progressive 3-session foundation building
- **Project Sparks**: Official FLL project initiation methodology
- **My Blocks Programming**: Structured approach to custom programming blocks
- **Coopertition®**: Learning competitive collaboration principles
- **Engineering Notebook**: Documentation and reflection practices
- **Gracious Professionalism®**: Core FLL values and sportsmanship

---

**Happy Coding! 🎉** Build amazing robots and bring them to life with Python!
