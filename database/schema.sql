-- LEGO VIBE Meetings and Learning Management Database Schema

-- Users table (7 kids + 2 coaches)
CREATE TABLE Users (
    id INT IDENTITY(1,1) PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    display_name VARCHAR(100) NOT NULL,
    role VARCHAR(20) NOT NULL CHECK (role IN ('kid', 'coach')),
    email VARCHAR(100),
    created_at DATETIME2 DEFAULT GETDATE(),
    is_active BIT DEFAULT 1
);

-- Meetings table
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

-- Learning entries table
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

-- Meeting attendance table
CREATE TABLE MeetingAttendance (
    id INT IDENTITY(1,1) PRIMARY KEY,
    meeting_id INT REFERENCES Meetings(id),
    user_id INT REFERENCES Users(id),
    attended BIT DEFAULT 0,
    marked_at DATETIME2 DEFAULT GETDATE(),
    UNIQUE(meeting_id, user_id)
);

-- Insert sample users (7 kids + 2 coaches)
INSERT INTO Users (username, display_name, role, email) VALUES
('coach_alex', 'Coach Alex', 'coach', 'alex@legoteam.com'),
('coach_sam', 'Coach Sam', 'coach', 'sam@legoteam.com'),
('emma_builder', 'Emma Thompson', 'kid', 'emma@student.com'),
('liam_coder', 'Liam Johnson', 'kid', 'liam@student.com'),
('sophia_designer', 'Sophia Davis', 'kid', 'sophia@student.com'),
('noah_engineer', 'Noah Wilson', 'kid', 'noah@student.com'),
('ava_programmer', 'Ava Brown', 'kid', 'ava@student.com'),
('mason_robotics', 'Mason Miller', 'kid', 'mason@student.com'),
('zoe_innovator', 'Zoe Garcia', 'kid', 'zoe@student.com');

-- Create indexes for better performance
CREATE INDEX IX_Meetings_Date ON Meetings(meeting_date);
CREATE INDEX IX_LearningEntries_Meeting ON LearningEntries(meeting_id);
CREATE INDEX IX_LearningEntries_User ON LearningEntries(user_id);
CREATE INDEX IX_MeetingAttendance_Meeting ON MeetingAttendance(meeting_id);