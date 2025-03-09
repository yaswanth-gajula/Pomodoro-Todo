import React, { useState, useEffect } from 'react';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';
import { FaPlay, FaPause, FaRedo } from 'react-icons/fa';

export default function PomodoroTimer({ onModeChange }) {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState('work');

  useEffect(() => {
    let interval = null;

    if (isActive) {
      interval = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            // Timer completed
            setIsActive(false);
            if (mode === 'work') {
              setMode('break');
              setMinutes(5);
              onModeChange('break');
            } else {
              setMode('work');
              setMinutes(25);
              onModeChange('work');
            }
            // Play notification sound
            new Audio('https://actions.google.com/sounds/v1/alarms/beep_short.ogg').play();
          } else {
            setMinutes(minutes - 1);
            setSeconds(59);
          }
        } else {
          setSeconds(seconds - 1);
        }
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isActive, seconds, minutes, mode, onModeChange]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    if (mode === 'work') {
      setMinutes(25);
    } else {
      setMinutes(5);
    }
    setSeconds(0);
  };

  const switchMode = () => {
    setIsActive(false);
    if (mode === 'work') {
      setMode('break');
      setMinutes(5);
      onModeChange('break');
    } else {
      setMode('work');
      setMinutes(25);
      onModeChange('work');
    }
    setSeconds(0);
  };

  return (
    <Container>
      <Card className={`shadow-sm border-0 bg-dark ${mode === 'break' ? 'card-break' : 'card-work'}`}>
        <Card.Body className="text-center p-4">
          <Card.Title>
            <h3 className={`mb-4 ${mode === 'work' ? 'text-primary' : 'text-success'}`}>
              {mode === 'work' ? '🎯 Work Time' : '☕ Break Time'}
            </h3>
          </Card.Title>
          <div className="timer-display mb-4">
            <h1 style={{ 
              fontSize: '5rem', 
              fontWeight: 'bold',
              color: mode === 'work' ? '#3f8cff' : '#2fb344'
            }}>
              {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
            </h1>
          </div>
          <Row className="justify-content-center mb-3">
            <Col xs="auto">
              <Button
                variant={isActive ? 'danger' : mode === 'work' ? 'primary' : 'success'}
                onClick={toggleTimer}
                className="rounded-circle p-3 mx-2 shadow-sm btn-glow"
                style={{ width: '60px', height: '60px' }}
              >
                {isActive ? <FaPause size={24} /> : <FaPlay size={24} />}
              </Button>
            </Col>
            <Col xs="auto">
              <Button
                variant="dark"
                onClick={resetTimer}
                className="rounded-circle p-3 mx-2 shadow-sm"
                style={{ width: '60px', height: '60px', borderColor: '#6c757d' }}
              >
                <FaRedo size={24} />
              </Button>
            </Col>
          </Row>
          <Button
            variant={mode === 'work' ? 'outline-primary' : 'outline-success'}
            onClick={switchMode}
            className="rounded-pill px-4 shadow-sm btn-glow"
          >
            Switch to {mode === 'work' ? 'Break' : 'Work'}
          </Button>
        </Card.Body>
      </Card>
      <style>
        {`
          .timer-display {
            transition: color 0.3s ease;
          }
          .rounded-circle {
            transition: all 0.2s ease;
          }
          .rounded-circle:hover {
            transform: scale(1.1);
          }
          .card {
            transition: all 0.3s ease;
          }
          .card-work {
            background-color: #212529 !important;
            border: 1px solid #2c3034 !important;
          }
          .card-break {
            background-color: #1a2a1f !important;
            border: 1px solid #2c3034 !important;
          }
          .btn-glow:hover {
            box-shadow: 0 0 15px rgba(var(--bs-primary-rgb), 0.5);
          }
          .btn-outline-primary, .btn-outline-success {
            border-width: 2px;
          }
          .btn-outline-primary:hover {
            box-shadow: 0 0 15px rgba(var(--bs-primary-rgb), 0.5);
          }
          .btn-outline-success:hover {
            box-shadow: 0 0 15px rgba(var(--bs-success-rgb), 0.5);
          }
        `}
      </style>
    </Container>
  );
} 