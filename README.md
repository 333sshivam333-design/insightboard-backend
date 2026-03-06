# InsightBoard Dependency Engine - Backend

## Live API

https://insightboard-backend-ec6p.onrender.com

## Overview

This backend service processes meeting transcripts and converts them into structured tasks with dependency relationships.

The system uses an LLM (Google Gemini API) to generate tasks and then validates the output before storing it in the database.

## Tech Stack

- Node.js
- Express.js
- TypeScript
- MongoDB Atlas
- Google Gemini API
- Render (Deployment)

## Features

### Transcript Processing
Accepts a meeting transcript and generates structured tasks using an LLM.

### Strict Output Schema
Each task follows the structure:
