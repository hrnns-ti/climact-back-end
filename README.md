# ClimACT API 🌱

**RESTful API service powering the Climact climate action platform**

> *Turning climate intentions into measurable actions through robust backend infrastructure*

## 📋 Overview

This backend service provides the core functionality for Climact - a gamified climate action platform that helps users track sustainability tasks, reduce carbon footprint, and participate in environmental challenges.
###
### 🎯 Core Modules

**🔐 Authentication & User Management** - Secure user accounts and profiles with role-based access  
**📋 Task Engine** - Dynamic daily/weekly climate action challenges  
**🏆 Gamification System** - Points, achievements, and progress tracking  
**📊 Analytics Engine** - Carbon footprint calculations and impact metrics  
**👥 Community Features** - Events, groups, and social interactions  

###
### 🔐 Authentication & Users

| Method | Endpoint | Description | Status |
|--------|----------|-------------|---------|
| `POST` | `/api/auth/register` | Create new climate warrior | ✅ **Live** |
| `POST` | `/api/auth/login` | User authentication | ✅ **Live** |
| `GET` | `/api/auth/profile` | Get user profile | 🚧 **Dev** |
| `PUT` | `/api/auth/preferences` | Update user settings | 🚧 **Dev** |

## Authors

- [@hearunnas](https://www.github.com/hrnns-ti)


## Tech Stack
**Server:** Node, Express