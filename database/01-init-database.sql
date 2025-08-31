-- Initialize LEGO VIBE database
USE master;
GO

-- Create the database if it doesn't exist
IF NOT EXISTS (SELECT name FROM sys.databases WHERE name = N'LegoVibeDB')
BEGIN
    CREATE DATABASE LegoVibeDB;
END
GO

-- Switch to the new database
USE LegoVibeDB;
GO

-- LEGO VIBE Meetings and Learning Management Database Schema

-- Users table (7 kids + 2 coaches)
IF OBJECT_ID('dbo.Users', 'U') IS NULL
BEGIN
    CREATE TABLE Users (
        id INT IDENTITY(1,1) PRIMARY KEY,
        username VARCHAR(50) UNIQUE NOT NULL,
        display_name VARCHAR(100) NOT NULL,
        role VARCHAR(20) NOT NULL CHECK (role IN ('kid', 'coach')),
        email VARCHAR(100),
        created_at DATETIME2 DEFAULT GETDATE(),
        is_active BIT DEFAULT 1
    );
END

-- Meetings table
IF OBJECT_ID('dbo.Meetings', 'U') IS NULL
BEGIN
    CREATE TABLE Meetings (
        id INT IDENTITY(1,1) PRIMARY KEY,
        title VARCHAR(200) NOT NULL,
        description TEXT,
        meeting_date DATETIME2 NOT NULL,
        duration_minutes INT DEFAULT 60,
        location VARCHAR(100),
        agenda TEXT,
        created_by INT REFERENCES Users(id),
        created_at DATETIME2 DEFAULT GETDATE(),
        status VARCHAR(20) DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'in-progress', 'completed', 'cancelled'))
    );
END

-- Learning entries table
IF OBJECT_ID('dbo.LearningEntries', 'U') IS NULL
BEGIN
    CREATE TABLE LearningEntries (
        id INT IDENTITY(1,1) PRIMARY KEY,
        meeting_id INT REFERENCES Meetings(id),
        user_id INT REFERENCES Users(id),
        entry_type VARCHAR(20) DEFAULT 'reflection' CHECK (entry_type IN ('reflection', 'goal', 'achievement', 'challenge', 'note')),
        title VARCHAR(200),
        content TEXT NOT NULL,
        created_at DATETIME2 DEFAULT GETDATE(),
        updated_at DATETIME2 DEFAULT GETDATE()
    );
END

-- Meeting attendance table
IF OBJECT_ID('dbo.MeetingAttendance', 'U') IS NULL
BEGIN
    CREATE TABLE MeetingAttendance (
        id INT IDENTITY(1,1) PRIMARY KEY,
        meeting_id INT REFERENCES Meetings(id),
        user_id INT REFERENCES Users(id),
        attended BIT DEFAULT 0,
        marked_at DATETIME2 DEFAULT GETDATE(),
        UNIQUE(meeting_id, user_id)
    );
END

-- Insert sample users (7 kids + 2 coaches) if they don't exist
IF NOT EXISTS (SELECT 1 FROM Users WHERE username = 'coach_gopi')
    INSERT INTO Users (username, display_name, role, email) VALUES ('coach_gopi', 'Coach Gopi', 'coach', 'gopi@legoteam.com');
IF NOT EXISTS (SELECT 1 FROM Users WHERE username = 'coach_rajesh')
    INSERT INTO Users (username, display_name, role, email) VALUES ('coach_rajesh', 'Coach Rajesh', 'coach', 'rajesh@legoteam.com');
IF NOT EXISTS (SELECT 1 FROM Users WHERE username = 'arnav_robotics')
    INSERT INTO Users (username, display_name, role, email) VALUES ('arnav_robotics', 'Arnav', 'kid', 'arnav@student.com');
IF NOT EXISTS (SELECT 1 FROM Users WHERE username = 'adi_programmer')
    INSERT INTO Users (username, display_name, role, email) VALUES ('adi_programmer', 'Adi', 'kid', 'adi@student.com');
IF NOT EXISTS (SELECT 1 FROM Users WHERE username = 'kabir_engineer')
    INSERT INTO Users (username, display_name, role, email) VALUES ('kabir_engineer', 'Kabir', 'kid', 'kabir@student.com');
IF NOT EXISTS (SELECT 1 FROM Users WHERE username = 'ram_builder')
    INSERT INTO Users (username, display_name, role, email) VALUES ('ram_builder', 'Ram', 'kid', 'ram@student.com');
IF NOT EXISTS (SELECT 1 FROM Users WHERE username = 'darsh_coder')
    INSERT INTO Users (username, display_name, role, email) VALUES ('darsh_coder', 'Darsh', 'kid', 'darsh@student.com');
IF NOT EXISTS (SELECT 1 FROM Users WHERE username = 'arjun_designer')
    INSERT INTO Users (username, display_name, role, email) VALUES ('arjun_designer', 'Arjun', 'kid', 'arjun@student.com');
IF NOT EXISTS (SELECT 1 FROM Users WHERE username = 'anaisha_innovator')
    INSERT INTO Users (username, display_name, role, email) VALUES ('anaisha_innovator', 'Anaisha', 'kid', 'anaisha@student.com');

-- Create indexes for better performance (if they don't exist)
IF NOT EXISTS (SELECT 1 FROM sys.indexes WHERE name = 'IX_Meetings_Date' AND object_id = OBJECT_ID('dbo.Meetings'))
    CREATE INDEX IX_Meetings_Date ON Meetings(meeting_date);
IF NOT EXISTS (SELECT 1 FROM sys.indexes WHERE name = 'IX_LearningEntries_Meeting' AND object_id = OBJECT_ID('dbo.LearningEntries'))
    CREATE INDEX IX_LearningEntries_Meeting ON LearningEntries(meeting_id);
IF NOT EXISTS (SELECT 1 FROM sys.indexes WHERE name = 'IX_LearningEntries_User' AND object_id = OBJECT_ID('dbo.LearningEntries'))
    CREATE INDEX IX_LearningEntries_User ON LearningEntries(user_id);
IF NOT EXISTS (SELECT 1 FROM sys.indexes WHERE name = 'IX_MeetingAttendance_Meeting' AND object_id = OBJECT_ID('dbo.MeetingAttendance'))
    CREATE INDEX IX_MeetingAttendance_Meeting ON MeetingAttendance(meeting_id);