import React, { useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import PomodoroTimer from './PomodoroTimer';
import TodoList from './TodoList';

export default function Dashboard() {
  const [mode, setMode] = useState('work');

  const handleModeChange = (newMode) => {
    setMode(newMode);
  };

  return (
    <div className={`app-wrapper ${mode}`}>
      <div className={`app-header text-white text-center py-4 mb-4 ${mode === 'work' ? 'bg-primary-dark' : 'bg-success-dark'}`}>
        <h1 className="display-4 fw-bold">Pomodoro & Task Manager</h1>
      </div>
      <Container fluid>
        <Row className="mb-4">
          <Col className="d-flex justify-content-between align-items-center">
            <h4 className="text-light">
              Welcome back, <span className={mode === 'work' ? 'text-primary' : 'text-success'}>User</span>
            </h4>
          </Col>
        </Row>
        
        <Row>
          <Col md={6} className="mb-4">
            <PomodoroTimer onModeChange={handleModeChange} />
          </Col>
          <Col md={6}>
            <TodoList mode={mode} />
          </Col>
        </Row>
      </Container>
      <style>
        {`
          body {
            background-color: #1a1a1a !important;
          }
          .app-wrapper {
            min-height: 100vh;
            transition: background-color 0.5s ease;
          }
          .app-wrapper.work {
            background-color: #1a1a1a;
          }
          .app-wrapper.break {
            background-color: #1a2a1f;
          }
          .bg-primary-dark {
            background: linear-gradient(135deg, #1a237e 0%, #0d47a1 100%) !important;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
          }
          .bg-success-dark {
            background: linear-gradient(135deg, #1b5e20 0%, #2e7d32 100%) !important;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
          }
          .display-4 {
            text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.4);
          }
          .btn-dark-mode {
            background-color: transparent;
            border-color: #dc3545;
            color: #dc3545;
          }
          .btn-dark-mode:hover {
            background-color: #dc3545;
            border-color: #dc3545;
            color: #fff;
          }
        `}
      </style>
    </div>
  );
} 